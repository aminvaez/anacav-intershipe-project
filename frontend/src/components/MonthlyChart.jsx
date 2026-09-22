import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MonthlyChart = ({ data }) => {
  return (
    <section className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
      <div className="mb-7">
        <h3 className="font-semibold text-white">روند دستورکارها</h3>

        <p className="mt-1 text-xs text-gray-500">
          مجموع دستورکارها به تفکیک ماه
        </p>
      </div>

      <div className="h-80 w-full" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 15, left: -10, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#1f2937"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#9ca3af",
                fontSize: 11,
              }}
              dy={8}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#6b7280",
                fontSize: 11,
              }}
            />

            <Tooltip
              cursor={{
                stroke: "#374151",
                strokeDasharray: "4 4",
              }}
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

            <Line
              type="monotone"
              dataKey="total"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{
                r: 4,
                strokeWidth: 2,
                fill: "#111827",
              }}
              activeDot={{
                r: 6,
                strokeWidth: 2,
                fill: "#3b82f6",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default MonthlyChart;
