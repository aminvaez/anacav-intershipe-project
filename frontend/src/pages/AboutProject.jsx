import {
  Database,
  FileSpreadsheet,
  GitBranch,
  Server,
  BarChart3,
  CheckCircle2,
  Layers3,
  Code2,
} from "lucide-react";

import Header from "../components/Header";

const AboutProject = () => {
  const steps = [
    {
      icon: FileSpreadsheet,
      title: "تحلیل و آماده‌سازی داده خام",
      description:
        "داده اولیه پروژه از یک فایل Excel دریافت شد. ساختار فایل شامل Headerهای چندسطحی، سلول‌های ادغام‌شده، ستون‌های تجمیعی و داده‌های Wide بود. داده‌ها با Python و Pandas بررسی، پاک‌سازی و به یک ساختار استاندارد و قابل پردازش تبدیل شدند.",
      items: [
        "بررسی ساختار و کیفیت داده‌ها",
        "حذف ردیف‌های تجمیعی و غیرضروری",
        "استانداردسازی نام فعالیت‌ها و وضعیت‌ها",
        "تبدیل داده از Wide Format به Long Format",
        "کنترل مقادیر خالی، تکراری و نامعتبر",
      ],
    },
    {
      icon: Database,
      title: "طراحی پایگاه داده مبدأ",
      description:
        "پس از پاک‌سازی داده‌ها، یک پایگاه داده PostgreSQL به عنوان Source Database طراحی شد تا داده‌های استانداردشده به جای وابستگی مستقیم به فایل Excel، از یک منبع ساخت‌یافته در دسترس باشند.",
      items: [
        "ایجاد Source Database در PostgreSQL",
        "طراحی جدول source_work_orders",
        "تعریف Primary Key و Unique Constraint",
        "تعریف Data Validation Constraintها",
        "بارگذاری داده‌های پاک‌سازی‌شده در پایگاه داده",
      ],
    },
    {
      icon: Layers3,
      title: "طراحی Data Warehouse",
      description:
        "برای تحلیل بهتر داده‌ها، یک Data Warehouse مجزا بر اساس مدل Star Schema طراحی شد. اطلاعات توصیفی در Dimension Tableها و مقادیر قابل اندازه‌گیری در Fact Table نگهداری می‌شوند.",
      items: [
        "طراحی dim_city",
        "طراحی dim_date",
        "طراحی dim_activity",
        "طراحی dim_status",
        "طراحی fact_work_orders",
        "استفاده از Surrogate Key و Foreign Key",
      ],
    },
    {
      icon: GitBranch,
      title: "پیاده‌سازی فرآیند ETL",
      description:
        "یک فرآیند ETL مستقل با Python توسعه داده شد که اطلاعات را از Source Database استخراج کرده، اعتبارسنجی و تبدیل می‌کند و سپس در Data Warehouse بارگذاری می‌کند.",
      items: [
        "Extract داده‌ها از Source Database",
        "اعتبارسنجی داده قبل از بارگذاری",
        "Transform و آماده‌سازی Dimensionها",
        "Load اطلاعات در Dimension و Fact Tableها",
        "استفاده از Upsert برای جلوگیری از داده تکراری",
        "کنترل Transaction با Commit و Rollback",
      ],
    },
    {
      icon: Server,
      title: "توسعه Backend و REST API",
      description:
        "Backend پروژه با Flask و SQLAlchemy توسعه داده شد. APIها مستقیماً اطلاعات تحلیلی موردنیاز Dashboard را از Data Warehouse دریافت و به صورت JSON ارائه می‌کنند.",
      items: [
        "پیاده‌سازی Flask Backend",
        "استفاده از SQLAlchemy ORM",
        "جداسازی Routes و Service Layer",
        "ایجاد API برای Summary و نمودارها",
        "پیاده‌سازی Query Parameter برای فیلترها",
        "مستندسازی APIها با Swagger",
      ],
    },
    {
      icon: BarChart3,
      title: "طراحی داشبورد تحلیلی",
      description:
        "Frontend پروژه با React طراحی شده و اطلاعات را از Flask API دریافت می‌کند. داشبورد امکان مشاهده شاخص‌های کلیدی، روند زمانی و مقایسه اطلاعات بر اساس شهر، فعالیت و وضعیت را فراهم می‌کند.",
      items: [
        "طراحی رابط کاربری Responsive",
        "نمایش KPIهای اصلی",
        "نمایش روند ماهانه دستورکارها",
        "تحلیل بر اساس شهر، فعالیت و وضعیت",
        "پیاده‌سازی نمودارها با Recharts",
        "پیاده‌سازی فیلترهای پویا",
      ],
    },
  ];

  const technologies = [
    "Python",
    "Pandas",
    "PostgreSQL",
    "SQLAlchemy",
    "Flask",
    "REST API",
    "React",
    "Tailwind CSS",
    "Recharts",
    "Swagger",
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-gray-950 text-gray-200">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">

        {/* Page Header */}
        <section className="mb-10">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <Code2 size={23} />
            </div>

            <h1 className="text-3xl font-bold text-white">
              درباره پروژه
            </h1>
          </div>

          <p className="max-w-4xl leading-8 text-gray-400">
            این پروژه یک سیستم کامل پردازش و تحلیل داده است که داده‌های خام
            را از فایل Excel دریافت کرده و پس از پاک‌سازی، مدل‌سازی و انتقال
            به Data Warehouse، آن‌ها را از طریق REST API در یک داشبورد
            تحلیلی نمایش می‌دهد.
          </p>
        </section>

        {/* Architecture */}
        <section className="mb-10 rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="mb-2 text-xl font-semibold text-white">
            معماری پروژه
          </h2>

          <p className="mb-6 text-sm leading-7 text-gray-400">
            جریان داده در پروژه به صورت مرحله‌ای طراحی شده است تا هر بخش
            مسئولیت مشخصی داشته باشد و سیستم قابلیت توسعه و نگهداری مناسبی
            داشته باشد.
          </p>

          <div
            dir="ltr"
            className="flex flex-wrap items-center justify-center gap-3 text-sm"
          >
            <ArchitectureBox title="Excel" subtitle="Raw Data" />

            <Arrow />

            <ArchitectureBox title="Pandas" subtitle="Cleaning" />

            <Arrow />

            <ArchitectureBox title="PostgreSQL" subtitle="Source DB" />

            <Arrow />

            <ArchitectureBox title="Python" subtitle="ETL" />

            <Arrow />

            <ArchitectureBox title="PostgreSQL" subtitle="Warehouse" />

            <Arrow />

            <ArchitectureBox title="Flask" subtitle="REST API" />

            <Arrow />

            <ArchitectureBox title="React" subtitle="Dashboard" />
          </div>
        </section>

        {/* Implementation */}
        <section className="mb-10">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">
              مراحل پیاده‌سازی
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              فرآیند توسعه پروژه از داده خام تا داشبورد نهایی
            </p>
          </div>

          <div className="space-y-5">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.title}
                  className="rounded-2xl border border-gray-800 bg-gray-900 p-6"
                >
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-800 text-blue-400">
                      <Icon size={22} />
                    </div>

                    <div className="w-full">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="text-xs font-medium text-gray-600">
                          مرحله {index + 1}
                        </span>

                        <h3 className="font-semibold text-white">
                          {step.title}
                        </h3>
                      </div>

                      <p className="mb-5 max-w-4xl text-sm leading-7 text-gray-400">
                        {step.description}
                      </p>

                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {step.items.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-2 text-sm text-gray-400"
                          >
                            <CheckCircle2
                              size={16}
                              className="shrink-0 text-emerald-500"
                            />

                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Data Model */}
        <section className="mb-10 rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="text-xl font-semibold text-white">
            مدل داده
          </h2>

          <p className="mt-2 max-w-4xl text-sm leading-7 text-gray-400">
            Data Warehouse پروژه بر اساس Star Schema طراحی شده است.
            جدول مرکزی Fact شامل تعداد دستورکارها بوده و از طریق Foreign
            Key به Dimensionهای شهر، زمان، فعالیت و وضعیت متصل می‌شود.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <TableCard
              name="fact_work_orders"
              type="Fact"
            />

            <TableCard
              name="dim_city"
              type="Dimension"
            />

            <TableCard
              name="dim_date"
              type="Dimension"
            />

            <TableCard
              name="dim_activity"
              type="Dimension"
            />

            <TableCard
              name="dim_status"
              type="Dimension"
            />
          </div>
        </section>

        {/* APIs */}
        <section className="mb-10 rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="text-xl font-semibold text-white">
            APIهای تحلیلی
          </h2>

          <p className="mt-2 text-sm leading-7 text-gray-400">
            Backend مجموعه‌ای از endpointهای تحلیلی در اختیار Frontend
            قرار می‌دهد. این APIها قابلیت دریافت فیلتر از طریق Query
            Parameter را نیز دارند.
          </p>

          <div
            dir="ltr"
            className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2"
          >
            <ApiEndpoint endpoint="/api/summary" />
            <ApiEndpoint endpoint="/api/monthly" />
            <ApiEndpoint endpoint="/api/statuses" />
            <ApiEndpoint endpoint="/api/activities" />
            <ApiEndpoint endpoint="/api/cities" />
            <ApiEndpoint endpoint="/api/filters" />
          </div>

          <div
            dir="ltr"
            className="mt-5 rounded-xl border border-gray-800 bg-gray-950 p-4 font-mono text-xs text-gray-400"
          >
            GET /api/activities?year=1401&month=8&city_id=1
          </div>
        </section>

        {/* Technologies */}
        <section className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="text-xl font-semibold text-white">
            تکنولوژی‌های استفاده‌شده
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            ابزارها و تکنولوژی‌های اصلی مورد استفاده در پروژه
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {technologies.map((technology) => (
              <span
                key={technology}
                dir="ltr"
                className="rounded-lg border border-gray-700 bg-gray-950 px-4 py-2 text-sm text-gray-300"
              >
                {technology}
              </span>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};


/* -----------------------------
   Small Components
----------------------------- */

const ArchitectureBox = ({ title, subtitle }) => {
  return (
    <div className="min-w-28 rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-center">
      <p className="font-medium text-white">
        {title}
      </p>

      <p className="mt-1 text-xs text-gray-500">
        {subtitle}
      </p>
    </div>
  );
};


const Arrow = () => {
  return (
    <span className="text-lg text-gray-600">
      →
    </span>
  );
};


const TableCard = ({ name, type }) => {
  return (
    <div
      dir="ltr"
      className="rounded-xl border border-gray-800 bg-gray-950 p-4"
    >
      <Database
        size={18}
        className="mb-3 text-blue-400"
      />

      <p className="text-sm font-medium text-gray-200">
        {name}
      </p>

      <p className="mt-1 text-xs text-gray-600">
        {type}
      </p>
    </div>
  );
};


const ApiEndpoint = ({ endpoint }) => {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-950 p-3">
      <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400">
        GET
      </span>

      <code className="text-sm text-gray-300">
        {endpoint}
      </code>
    </div>
  );
};


export default AboutProject;