import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { city: "شهر 1", value: 420 },
  { city: "شهر 2", value: 380 },
  { city: "شهر 3", value: 350 },
  { city: "شهر 4", value: 320 },
  { city: "شهر 5", value: 290 },
  { city: "شهر 6", value: 260 },
  { city: "شهر 7", value: 240 },
  { city: "شهر 8", value: 210 },
];

const CityChart = () => {
  return (
    <section className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-white">
            دستورکارها بر اساس شهر
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            مقایسه حجم دستورکارهای ثبت‌شده در شهرها
          </p>
        </div>

        <span className="rounded-lg bg-gray-800 px-3 py-1 text-xs text-gray-400">
          16 شهر
        </span>
      </div>

      <div className="h-96" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="#374151"
            />

            <XAxis
              type="number"
              stroke="#6b7280"
            />

            <YAxis
              type="category"
              dataKey="city"
              stroke="#6b7280"
              width={80}
            />

            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "1px solid #374151",
                borderRadius: "12px",
              }}
            />

            <Bar
              dataKey="value"
              fill="#3b82f6"
              radius={[0, 6, 6, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default CityChart;