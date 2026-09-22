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
  { activity: "test_1", value: 720 },
  { activity: "test_2", value: 640 },
  { activity: "test_3", value: 590 },
  { activity: "test_4_a", value: 550 },
  { activity: "test_4_b", value: 510 },
  { activity: "test_6", value: 470 },
  { activity: "test_7", value: 395 },
];

const ActivityChart = () => {
  return (
    <section className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
      <div className="mb-6">
        <h3 className="font-semibold text-white">
          فعالیت‌ها
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          تعداد دستورکارها بر اساس نوع فعالیت
        </p>
      </div>

      <div className="h-72" dir="ltr">
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
              dataKey="activity"
              stroke="#6b7280"
              width={70}
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
              fill="#06b6d4"
              radius={[0, 6, 6, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default ActivityChart;