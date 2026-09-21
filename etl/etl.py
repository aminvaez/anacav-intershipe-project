import pandas as pd
import psycopg

from etl.config import (
    get_source_config,
    get_warehouse_config,
)


def extract_source_data(source_conn):
    query = """
        SELECT
            city_name,
            city_code,
            report_year,
            report_month,
            activity,
            status,
            work_order_count
        FROM source_work_orders;
    """

    with source_conn.cursor() as cursor:
        cursor.execute(query)

        rows = cursor.fetchall()
        columns = [desc.name for desc in cursor.description]

    df = pd.DataFrame(rows, columns=columns)

    print(f"Extracted {len(df)} rows from source_db.")

    return df


def validate_source_data(df):
    if df.empty:
        raise ValueError("Source data is empty.")

    required_columns = [
        "city_name",
        "city_code",
        "report_year",
        "report_month",
        "activity",
        "status",
        "work_order_count",
    ]

    missing_columns = [
        column
        for column in required_columns
        if column not in df.columns
    ]

    if missing_columns:
        raise ValueError(
            f"Missing required columns: {missing_columns}"
        )

    if df[required_columns].isnull().any().any():
        raise ValueError("Source data contains NULL values.")

    duplicate_count = df.duplicated(
        subset=[
            "city_code",
            "report_year",
            "report_month",
            "activity",
            "status",
        ]
    ).sum()

    if duplicate_count > 0:
        raise ValueError(
            f"Found {duplicate_count} duplicate business keys."
        )

    if (df["work_order_count"] < 0).any():
        raise ValueError("Negative work_order_count found.")

    if not df["report_month"].between(1, 12).all():
        raise ValueError("Invalid report_month found.")

    print("Source validation passed.")


def transform_dimensions(df):
    cities = (
        df[["city_code", "city_name"]]
        .drop_duplicates()
        .sort_values("city_code")
    )

    dates = (
        df[["report_year", "report_month"]]
        .drop_duplicates()
        .sort_values(
            ["report_year", "report_month"]
        )
    )

    activities = (
        df[["activity"]]
        .drop_duplicates()
        .sort_values("activity")
    )

    statuses = (
        df[["status"]]
        .drop_duplicates()
        .sort_values("status")
    )

    print(
        f"Dimensions prepared: "
        f"{len(cities)} cities, "
        f"{len(dates)} dates, "
        f"{len(activities)} activities, "
        f"{len(statuses)} statuses."
    )

    return cities, dates, activities, statuses


def load_dimensions(
    warehouse_conn,
    cities,
    dates,
    activities,
    statuses,
):
    with warehouse_conn.cursor() as cursor:

        for row in cities.itertuples(index=False):
            cursor.execute(
                """
                INSERT INTO dim_city (
                    city_code,
                    city_name
                )
                VALUES (%s, %s)

                ON CONFLICT (city_code)
                DO UPDATE SET
                    city_name = EXCLUDED.city_name;
                """,
                (
                    int(row.city_code),
                    row.city_name,
                ),
            )

        for row in dates.itertuples(index=False):
            cursor.execute(
                """
                INSERT INTO dim_date (
                    report_year,
                    report_month
                )
                VALUES (%s, %s)

                ON CONFLICT (
                    report_year,
                    report_month
                )
                DO NOTHING;
                """,
                (
                    int(row.report_year),
                    int(row.report_month),
                ),
            )

        for row in activities.itertuples(index=False):
            cursor.execute(
                """
                INSERT INTO dim_activity (
                    activity_name
                )
                VALUES (%s)

                ON CONFLICT (activity_name)
                DO NOTHING;
                """,
                (row.activity,),
            )

        for row in statuses.itertuples(index=False):
            cursor.execute(
                """
                INSERT INTO dim_status (
                    status_name
                )
                VALUES (%s)

                ON CONFLICT (status_name)
                DO NOTHING;
                """,
                (row.status,),
            )

    print("Dimensions loaded.")


def get_dimension_maps(warehouse_conn):
    with warehouse_conn.cursor() as cursor:

        cursor.execute(
            """
            SELECT
                city_id,
                city_code
            FROM dim_city;
            """
        )

        city_map = {
            city_code: city_id
            for city_id, city_code in cursor.fetchall()
        }

        cursor.execute(
            """
            SELECT
                date_id,
                report_year,
                report_month
            FROM dim_date;
            """
        )

        date_map = {
            (year, month): date_id
            for date_id, year, month in cursor.fetchall()
        }

        cursor.execute(
            """
            SELECT
                activity_id,
                activity_name
            FROM dim_activity;
            """
        )

        activity_map = {
            name: activity_id
            for activity_id, name in cursor.fetchall()
        }

        cursor.execute(
            """
            SELECT
                status_id,
                status_name
            FROM dim_status;
            """
        )

        status_map = {
            name: status_id
            for status_id, name in cursor.fetchall()
        }

    return (
        city_map,
        date_map,
        activity_map,
        status_map,
    )


def build_fact_records(
    df,
    city_map,
    date_map,
    activity_map,
    status_map,
):
    records = []

    for row in df.itertuples(index=False):
        records.append(
            (
                city_map[row.city_code],
                date_map[
                    (
                        row.report_year,
                        row.report_month,
                    )
                ],
                activity_map[row.activity],
                status_map[row.status],
                int(row.work_order_count),
            )
        )

    print(f"Prepared {len(records)} fact records.")

    return records


def load_facts(warehouse_conn, records):
    query = """
        INSERT INTO fact_work_orders (
            city_id,
            date_id,
            activity_id,
            status_id,
            work_order_count
        )
        VALUES (%s, %s, %s, %s, %s)

        ON CONFLICT (
            city_id,
            date_id,
            activity_id,
            status_id
        )
        DO UPDATE SET
            work_order_count =
                EXCLUDED.work_order_count;
    """

    with warehouse_conn.cursor() as cursor:
        cursor.executemany(query, records)

    print(f"Loaded {len(records)} fact records.")


def run_etl():
    print("Starting ETL...")

    source_conn = None
    warehouse_conn = None

    try:
        source_conn = psycopg.connect(
            **get_source_config()
        )

        warehouse_conn = psycopg.connect(
            **get_warehouse_config()
        )

        # Extract
        source_df = extract_source_data(source_conn)

        # Validate
        validate_source_data(source_df)

        # Transform
        (
            cities,
            dates,
            activities,
            statuses,
        ) = transform_dimensions(source_df)

        # Load dimensions
        load_dimensions(
            warehouse_conn,
            cities,
            dates,
            activities,
            statuses,
        )

        # Get surrogate keys
        (
            city_map,
            date_map,
            activity_map,
            status_map,
        ) = get_dimension_maps(warehouse_conn)

        # Build fact records
        fact_records = build_fact_records(
            source_df,
            city_map,
            date_map,
            activity_map,
            status_map,
        )

        # Load facts
        load_facts(
            warehouse_conn,
            fact_records,
        )

        # Everything succeeded
        warehouse_conn.commit()

        print("ETL completed successfully.")

    except Exception as error:
        if warehouse_conn is not None:
            warehouse_conn.rollback()

        print(f"ETL failed: {error}")

        raise

    finally:
        if source_conn is not None:
            source_conn.close()

        if warehouse_conn is not None:
            warehouse_conn.close()


if __name__ == "__main__":
    run_etl()