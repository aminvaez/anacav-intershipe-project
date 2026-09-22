import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const activityNames = {
  test_7: "تست ۷",
  test_4_a: "تست ۴",
  test_4_b: "تست ۵",
  test_1: "تست ۱",
  test_2: "تست ۲",
  test_3: "تست ۳",
  test_6: "تست ۶",
};

const ActivityChart = ({ data }) => {
  const chartData = data.map((item) => ({
    ...item,
    activity: activityNames[item.activity] || item.activity,
  }));

  return (
    <section className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
      <div className="mb-6">
        <h3 className="font-semibold text-white">فعالیت‌ها</h3>

        <p className="mt-1 text-xs text-gray-500">
          تعداد دستورکارها بر اساس نوع فعالیت
        </p>
      </div>

      <div className="h-72" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ left: 10, right: 20, top: 5, bottom: 5 }}
            barCategoryGap="25%"
          >
            <CartesianGrid
              strokeDasharray="4 4"
              horizontal={false}
              stroke="#1f2937"
            />

            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 11 }}
            />

            <YAxis
              type="category"
              dataKey="activity"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              width={90}
            />

            <Tooltip
              cursor={false}
              contentStyle={{
                background: "#111827",
                border: "1px solid #374151",
                borderRadius: "12px",
                padding: "10px 14px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
              }}
              labelStyle={{
                color: "#d1d5db",
                marginBottom: "4px",
              }}
              itemStyle={{
                color: "#22d3ee",
              }}
            />

            <Bar
              dataKey="total"
              fill="#06b6d4"
              activeBar={false}
              radius={[0, 8, 8, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default ActivityChart;