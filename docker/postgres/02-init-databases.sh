#!/bin/bash
set -e

echo "Creating source schema..."

psql \
  -v ON_ERROR_STOP=1 \
  --username "$POSTGRES_USER" \
  --dbname "source_db" <<-EOSQL

CREATE TABLE IF NOT EXISTS source_work_orders (
    source_id BIGSERIAL PRIMARY KEY,

    city_name VARCHAR(100) NOT NULL,
    city_code INTEGER NOT NULL,

    report_year SMALLINT NOT NULL,
    report_month SMALLINT NOT NULL,

    activity VARCHAR(100) NOT NULL,
    status VARCHAR(100) NOT NULL,

    work_order_count INTEGER NOT NULL,

    source_file VARCHAR(255)
        DEFAULT 'clean_work_orders.csv',

    loaded_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_report_month
        CHECK (report_month BETWEEN 1 AND 12),

    CONSTRAINT chk_work_order_count
        CHECK (work_order_count >= 0),

    CONSTRAINT uq_source_work_order
        UNIQUE (
            city_code,
            report_year,
            report_month,
            activity,
            status
        )
);

EOSQL


echo "Loading source CSV..."

psql \
  -v ON_ERROR_STOP=1 \
  --username "$POSTGRES_USER" \
  --dbname "source_db" \
  -c "\copy source_work_orders(city_name, city_code, report_year, report_month, activity, status, work_order_count) FROM '/docker-data/clean_work_orders.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8')"


echo "Creating warehouse schema..."

psql \
  -v ON_ERROR_STOP=1 \
  --username "$POSTGRES_USER" \
  --dbname "warehouse_db" \
  --file="/docker-sql/warehouse_schema.sql"


echo "Database initialization completed."