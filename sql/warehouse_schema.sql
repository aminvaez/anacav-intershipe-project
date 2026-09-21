CREATE TABLE dim_city (
    city_id SERIAL PRIMARY KEY,
    city_code INTEGER NOT NULL UNIQUE,
    city_name VARCHAR(100) NOT NULL
);

CREATE TABLE dim_date (
    date_id SERIAL PRIMARY KEY,
    report_year SMALLINT NOT NULL,
    report_month SMALLINT NOT NULL,

    CONSTRAINT chk_dim_month
        CHECK (report_month BETWEEN 1 AND 12),

    CONSTRAINT uq_dim_date
        UNIQUE (report_year, report_month)
);

CREATE TABLE dim_activity (
    activity_id SERIAL PRIMARY KEY,
    activity_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE dim_status (
    status_id SERIAL PRIMARY KEY,
    status_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE fact_work_orders (
    fact_id BIGSERIAL PRIMARY KEY,

    city_id INTEGER NOT NULL,
    date_id INTEGER NOT NULL,
    activity_id INTEGER NOT NULL,
    status_id INTEGER NOT NULL,

    work_order_count INTEGER NOT NULL,

    CONSTRAINT fk_fact_city
        FOREIGN KEY (city_id)
        REFERENCES dim_city(city_id),

    CONSTRAINT fk_fact_date
        FOREIGN KEY (date_id)
        REFERENCES dim_date(date_id),

    CONSTRAINT fk_fact_activity
        FOREIGN KEY (activity_id)
        REFERENCES dim_activity(activity_id),

    CONSTRAINT fk_fact_status
        FOREIGN KEY (status_id)
        REFERENCES dim_status(status_id),

    CONSTRAINT chk_fact_count
        CHECK (work_order_count >= 0),

    CONSTRAINT uq_fact_work_order
        UNIQUE (
            city_id,
            date_id,
            activity_id,
            status_id
        )
);
