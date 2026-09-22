import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const StatusChart = ({ data }) => {
  const statusLabels = {
    in_progress: "در حال انجام",
    at_consultant: "نزد مشاور",
    at_headquarters: "در ستاد",
    statement_preparation: "تهیه صورت‌وضعیت",
    at_finance: "در امور مالی",
  };

  return (
    <section className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
      <div className="mb-6">
        <h3 className="font-semibold text-white">وضعیت دستورکارها</h3>

        <p className="mt-1 text-xs text-gray-500">
          توزیع دستورکارها بر اساس وضعیت
        </p>
      </div>

      <div className="h-72" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#1f2937"
            />

            <XAxis
              dataKey="status"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              dy={8}
              tickFormatter={(value) => statusLabels[value] || "نامشخص"}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 11 }}
            />

            <Tooltip
              cursor={{ fill: "rgba(139, 92, 246, 0.08)" }}
              contentStyle={{
                background: "#111827",
                border: "1px solid #374151",
                borderRadius: "12px",
                padding: "10px 14px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
              }}
              labelFormatter={(value) => statusLabels[value] || "نامشخص"}
              labelStyle={{
                color: "#d1d5db",
                marginBottom: "4px",
              }}
              itemStyle={{
                color: "#a78bfa",
              }}
            />

            <Bar
              dataKey="total"
              fill="#8b5cf6"
              radius={[8, 8, 2, 2]}
              activeBar={false}
              maxBarSize={55}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default StatusChart;