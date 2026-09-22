import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "ماه 7", orders: 1559 },
  { month: "ماه 8", orders: 1210 },
  { month: "ماه 9", orders: 1106 },
];

const MonthlyChart = () => {
  return (
    <section className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
      <div className="mb-7">
        <h3 className="font-semibold text-white">
          روند دستورکارها
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          مجموع دستورکارها به تفکیک ماه
        </p>
      </div>

      <div className="h-80 w-full" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#374151"
            />

            <XAxis
              dataKey="month"
              stroke="#6b7280"
            />

            <YAxis stroke="#6b7280" />

            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "1px solid #374151",
                borderRadius: "12px",
              }}
            />

            <Line
              type="monotone"
              dataKey="orders"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default MonthlyChart;