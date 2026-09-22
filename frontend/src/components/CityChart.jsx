import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CityChart = ({ data }) => {
  return (
    <section className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-white">دستورکارها بر اساس شهر</h3>

          <p className="mt-1 text-xs text-gray-500">
            مقایسه حجم دستورکارهای ثبت‌شده در شهرها
          </p>
        </div>

        <span className="rounded-lg bg-gray-800 px-3 py-1 text-xs text-gray-400">
          {data?.length ?? 0} شهر
        </span>
      </div>

      <div className="h-96" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
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
              tick={{
                fill: "#6b7280",
                fontSize: 11,
              }}
            />

            <YAxis
              type="category"
              dataKey="city"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#9ca3af",
                fontSize: 11,
              }}
              width={100}
              interval={0}
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
                color: "#60a5fa",
              }}
            />

            <Bar
              dataKey="total"
              fill="#3b82f6"
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

export default CityChart;
