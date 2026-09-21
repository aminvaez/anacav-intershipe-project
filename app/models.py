from app.db import db


class City(db.Model):
    __tablename__ = "dim_city"

    city_id = db.Column(
        db.Integer,
        primary_key=True
    )

    city_code = db.Column(
        db.Integer,
        unique=True,
        nullable=False
    )

    city_name = db.Column(
        db.String(100),
        nullable=False
    )


class Date(db.Model):
    __tablename__ = "dim_date"

    date_id = db.Column(
        db.Integer,
        primary_key=True
    )

    report_year = db.Column(
        db.SmallInteger,
        nullable=False
    )

    report_month = db.Column(
        db.SmallInteger,
        nullable=False
    )


class Activity(db.Model):
    __tablename__ = "dim_activity"

    activity_id = db.Column(
        db.Integer,
        primary_key=True
    )

    activity_name = db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )


class Status(db.Model):
    __tablename__ = "dim_status"

    status_id = db.Column(
        db.Integer,
        primary_key=True
    )

    status_name = db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )


class WorkOrder(db.Model):
    __tablename__ = "fact_work_orders"

    fact_id = db.Column(
        db.BigInteger,
        primary_key=True
    )

    city_id = db.Column(
        db.Integer,
        db.ForeignKey("dim_city.city_id"),
        nullable=False
    )

    date_id = db.Column(
        db.Integer,
        db.ForeignKey("dim_date.date_id"),
        nullable=False
    )

    activity_id = db.Column(
        db.Integer,
        db.ForeignKey("dim_activity.activity_id"),
        nullable=False
    )

    status_id = db.Column(
        db.Integer,
        db.ForeignKey("dim_status.status_id"),
        nullable=False
    )

    work_order_count = db.Column(
        db.Integer,
        nullable=False
    )

    city = db.relationship("City")
    date = db.relationship("Date")
    activity = db.relationship("Activity")
    status = db.relationship("Status")
