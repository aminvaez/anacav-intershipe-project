from flask import Blueprint, jsonify, request
from app.services import (
    get_summary,
    get_monthly_data,
    get_status_data,
    get_activity_data,
    get_city_data,
    get_filter_options,
)


api = Blueprint(
    "api",
    __name__,
    url_prefix="/api"
)


@api.route("/summary", methods=["GET"])
def summary():
    """
    Get dashboard summary
    ---
    tags:
      - Dashboard
    responses:
      200:
        description: Dashboard summary
    """
    filters = get_query_filters()
    
    return jsonify(
        get_summary(**filters)
    )


@api.route("/monthly", methods=["GET"])
def monthly():
    """
    Get work orders grouped by month
    ---
    tags:
      - Dashboard
    responses:
      200:
        description: Monthly work order totals
    """
    filters = get_query_filters()
    return jsonify(get_monthly_data(**filters))


@api.route("/statuses", methods=["GET"])
def statuses():
    """
    Get work orders grouped by status
    ---
    tags:
      - Dashboard
    responses:
      200:
        description: Work order totals by status
    """
    
    return jsonify( get_status_data(**get_query_filters()) )


@api.route("/activities", methods=["GET"])
def activities():
    """
    Get work orders grouped by activity
    ---
    tags:
      - Dashboard
    responses:
      200:
        description: Work order totals by activity
    """
    return jsonify(get_activity_data(**get_query_filters()))


@api.route("/cities", methods=["GET"])
def cities():
    """
    Get work orders grouped by city
    ---
    tags:
      - Dashboard
    responses:
      200:
        description: Work order totals by city
    """
    return jsonify(get_city_data(**get_query_filters()))
  
@api.route("/filters", methods=["GET"])
def filters():
    return jsonify(get_filter_options())

def get_query_filters():
    return {
        "year": request.args.get("year", type=int),
        "month": request.args.get("month", type=int),
        "city_id": request.args.get("city_id", type=int),
        "activity_id": request.args.get("activity_id", type=int),
        "status_id": request.args.get("status_id", type=int),
    }