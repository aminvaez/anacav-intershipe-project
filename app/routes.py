from flask import Blueprint, jsonify

from app.services import get_summary


api = Blueprint(
    "api",
    __name__,
    url_prefix="/api"
)


@api.route("/summary", methods=["GET"])
def summary():
    """
    Get overall work order summary
    ---
    tags:
      - Analytics

    responses:
      200:
        description: Overall work order statistics
        schema:
          type: object
          properties:
            fact_rows:
              type: integer
              example: 1536
            total_work_orders:
              type: integer
              example: 3875
    """

    data = get_summary()

    return jsonify(data)