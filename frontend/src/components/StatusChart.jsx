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
  { status: "در حال انجام", value: 1100 },
  { status: "تهیه صورت وضعیت", value: 850 },
  { status: "مشاور", value: 720 },
  { status: "ستاد", value: 650 },
  { status: "مالی", value: 555 },
];

const StatusChart = () => {
  return (
    <section className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
      <div className="mb-6">
        <h3 className="font-semibold text-white">
          وضعیت دستورکارها
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          توزیع دستورکارها بر اساس وضعیت
        </p>
      </div>

      <div className="h-72" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#374151"
            />

            <XAxis
              dataKey="status"
              stroke="#6b7280"
              fontSize={11}
            />

            <YAxis stroke="#6b7280" />

            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "1px solid #374151",
                borderRadius: "12px",
              }}
            />

            <Bar
              dataKey="value"
              fill="#8b5cf6"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default StatusChart;