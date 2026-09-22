import os

from flask import Flask
from dotenv import load_dotenv
from flasgger import Swagger
from flask_cors import CORS
from app.db import db


load_dotenv()


def create_app():
    app = Flask(__name__)
    CORS(app)
    db_user = os.getenv("DB_USER")
    db_password = os.getenv("DB_PASSWORD")
    db_host = os.getenv("DB_HOST", "localhost")
    db_port = os.getenv("DB_PORT", "5432")
    warehouse_db = os.getenv("WAREHOUSE_DB", "warehouse_db")

    app.config["SQLALCHEMY_DATABASE_URI"] = (
        f"postgresql+psycopg://{db_user}:{db_password}"
        f"@{db_host}:{db_port}/{warehouse_db}"
    )

    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    # Swagger configuration
    swagger_config = {
    "headers": [],
    "specs": [
        {
            "endpoint": "apispec_1",
            "route": "/apispec_1.json",
            "rule_filter": lambda rule: True,
            "model_filter": lambda tag: True,
        }
    ],
    "static_url_path": "/flasgger_static",
    "swagger_ui": True,
    "specs_route": "/swagger/",
}

    swagger_template = {
        "swagger": "2.0",
        "info": {
            "title": "Work Orders Analytics API",
            "description": "API for analytical work order data",
            "version": "1.0.0",
        },
    }

    Swagger(
        app,
        config=swagger_config,
        template=swagger_template,
    )

    from app.routes import api
    app.register_blueprint(api)

    return app
