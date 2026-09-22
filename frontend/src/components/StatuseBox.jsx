import { Building2, Activity, MapPin } from "lucide-react";

const StatusBox = ({ summary }) => {
  const cards = [
    {
      title: "کل دستورکارها",
      value: summary?.total_work_orders ?? 0,
      description: "مجموع دستورکارهای ثبت‌شده",
      icon: Building2,
    },
    {
      title: "فعالیت‌ها",
      value: summary?.total_activities ?? 0,
      description: "تعداد انواع فعالیت",
      icon: Activity,
    },
    {
      title: "شهرها",
      value: summary?.total_cities ?? 0,
      description: "شهرهای تحت پوشش",
      icon: MapPin,
    },
  ];
  return (
  <section
    dir="rtl"
    className="grid grid-cols-1 gap-4 md:grid-cols-3"
  >
    {cards.map((card) => {
      const Icon = card.icon;

      return (
        <div
          key={card.title}
          className="
            group rounded-2xl
            border border-gray-800
            bg-gray-900
            p-6
            transition
            hover:-translate-y-1
            hover:border-gray-700
            hover:shadow-xl
          "
        >
          <div className="mb-5 flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-400">
                {card.title}
              </p>

              <p className="mt-2 text-3xl font-bold tracking-tight text-white">
                {card.value.toLocaleString()}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-800 text-xl text-gray-300">
              <Icon size={22} />
            </div>
          </div>

          <p className="text-xs text-gray-500">
            {card.description}
          </p>
        </div>
      );
    })}
  </section>
);
};

export default StatusBox;
