from sqlalchemy import func

from app.db import db
from app.models import (
    WorkOrder,
    City,
    Date,
    Activity,
    Status,
)


def get_summary(
    year=None,
    month=None,
    city_id=None,
    activity_id=None,
    status_id=None,
):
    query = (
        db.session.query(
            func.coalesce(
                func.sum(WorkOrder.work_order_count),
                0
            )
        )
        .join(
            Date,
            WorkOrder.date_id == Date.date_id
        )
    )

    query = apply_filters(
        query,
        year,
        month,
        city_id,
        activity_id,
        status_id,
    )

    total_work_orders = query.scalar()

    return {
        "total_work_orders": total_work_orders,
        "total_cities": db.session.query(
            func.count(City.city_id)
        ).scalar(),
        "total_activities": db.session.query(
            func.count(Activity.activity_id)
        ).scalar(),
    }

def get_monthly_data(
    year=None,
    month=None,
    city_id=None,
    activity_id=None,
    status_id=None,
):
    query = (
        db.session.query(
            Date.report_year,
            Date.report_month,
            func.sum(
                WorkOrder.work_order_count
            ).label("total"),
        )
        .join(
            WorkOrder,
            WorkOrder.date_id == Date.date_id
        )
    )

    query = apply_filters(
        query,
        year,
        month,
        city_id,
        activity_id,
        status_id,
    )

    rows = (
        query
        .group_by(
            Date.report_year,
            Date.report_month
        )
        .order_by(
            Date.report_year,
            Date.report_month
        )
        .all()
    )

    return [
        {
            "year": row.report_year,
            "month": row.report_month,
            "total": row.total,
        }
        for row in rows
    ]
def get_status_data(
    year=None,
    month=None,
    city_id=None,
    activity_id=None,
    status_id=None,
):
    query = (
        db.session.query(
            Status.status_id,
            Status.status_name,
            func.sum(
                WorkOrder.work_order_count
            ).label("total"),
        )
        .join(
            WorkOrder,
            WorkOrder.status_id == Status.status_id
        )
        .join(
            Date,
            WorkOrder.date_id == Date.date_id
        )
    )

    query = apply_filters(
        query,
        year,
        month,
        city_id,
        activity_id,
        status_id,
    )

    rows = (
        query
        .group_by(
            Status.status_id,
            Status.status_name
        )
        .order_by(
            func.sum(
                WorkOrder.work_order_count
            ).desc()
        )
        .all()
    )

    return [
        {
            "status_id": row.status_id,
            "status": row.status_name,
            "total": row.total,
        }
        for row in rows
    ]

def get_activity_data(
    year=None,
    month=None,
    city_id=None,
    activity_id=None,
    status_id=None,
):
    query = (
        db.session.query(
            Activity.activity_id,
            Activity.activity_name,
            func.sum(
                WorkOrder.work_order_count
            ).label("total"),
        )
        .join(
            WorkOrder,
            WorkOrder.activity_id == Activity.activity_id
        )
        .join(
            Date,
            WorkOrder.date_id == Date.date_id
        )
    )

    query = apply_filters(
        query,
        year,
        month,
        city_id,
        activity_id,
        status_id,
    )

    rows = (
        query
        .group_by(
            Activity.activity_id,
            Activity.activity_name
        )
        .order_by(
            func.sum(
                WorkOrder.work_order_count
            ).desc()
        )
        .all()
    )

    return [
        {
            "activity_id": row.activity_id,
            "activity": row.activity_name,
            "total": row.total,
        }
        for row in rows
    ]

def get_city_data(
    year=None,
    month=None,
    city_id=None,
    activity_id=None,
    status_id=None,
):
    query = (
        db.session.query(
            City.city_id,
            City.city_code,
            City.city_name,
            func.sum(
                WorkOrder.work_order_count
            ).label("total"),
        )
        .join(
            WorkOrder,
            WorkOrder.city_id == City.city_id
        )
        .join(
            Date,
            WorkOrder.date_id == Date.date_id
        )
    )

    query = apply_filters(
        query,
        year,
        month,
        city_id,
        activity_id,
        status_id,
    )

    rows = (
        query
        .group_by(
            City.city_id,
            City.city_code,
            City.city_name
        )
        .order_by(
            func.sum(
                WorkOrder.work_order_count
            ).desc()
        )
        .all()
    )

    return [
        {
            "city_id": row.city_id,
            "city_code": row.city_code,
            "city": row.city_name,
            "total": row.total,
        }
        for row in rows
    ]

def get_filter_options():
    dates = (
        db.session.query(
            Date.report_year,
            Date.report_month
        )
        .distinct()
        .order_by(
            Date.report_year,
            Date.report_month
        )
        .all()
    )

    cities = (
        db.session.query(City)
        .order_by(City.city_name)
        .all()
    )

    activities = (
        db.session.query(Activity)
        .order_by(Activity.activity_name)
        .all()
    )

    statuses = (
        db.session.query(Status)
        .order_by(Status.status_name)
        .all()
    )

    years = sorted(
        list(set(date.report_year for date in dates))
    )

    months = sorted(
        list(set(date.report_month for date in dates))
    )

    return {
        "years": years,
        "months": months,

        "cities": [
            {
                "id": city.city_id,
                "name": city.city_name
            }
            for city in cities
        ],

        "activities": [
            {
                "id": activity.activity_id,
                "name": activity.activity_name
            }
            for activity in activities
        ],

        "statuses": [
            {
                "id": status.status_id,
                "name": status.status_name
            }
            for status in statuses
        ],
    }
    
def apply_filters(
    query,
    year=None,
    month=None,
    city_id=None,
    activity_id=None,
    status_id=None,
):
    if year is not None:
        query = query.filter(
            Date.report_year == year
        )

    if month is not None:
        query = query.filter(
            Date.report_month == month
        )

    if city_id is not None:
        query = query.filter(
            WorkOrder.city_id == city_id
        )

    if activity_id is not None:
        query = query.filter(
            WorkOrder.activity_id == activity_id
        )

    if status_id is not None:
        query = query.filter(
            WorkOrder.status_id == status_id
        )

    return query