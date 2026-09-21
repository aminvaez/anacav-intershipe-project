from sqlalchemy import func

from app.db import db
from app.models import WorkOrder


def get_summary():

    result = db.session.query(
        func.count(WorkOrder.fact_id),
        func.sum(WorkOrder.work_order_count)
    ).one()

    return {
        "fact_rows": result[0],
        "total_work_orders": result[1] or 0
    }
