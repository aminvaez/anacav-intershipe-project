import os
from dotenv import load_dotenv

load_dotenv()

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

SOURCE_DB = os.getenv("SOURCE_DB", "source_db")
WAREHOUSE_DB = os.getenv("WAREHOUSE_DB", "warehouse_db")


def get_source_config():
    return {
        "host": DB_HOST,
        "port": DB_PORT,
        "dbname": SOURCE_DB,
        "user": DB_USER,
        "password": DB_PASSWORD,
    }


def get_warehouse_config():
    return {
        "host": DB_HOST,
        "port": DB_PORT,
        "dbname": WAREHOUSE_DB,
        "user": DB_USER,
        "password": DB_PASSWORD,
    }