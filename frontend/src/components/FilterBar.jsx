import { RotateCcw } from "lucide-react";

const FilterBar = ({ filters, setFilters, options }) => {
  const activityNames = {
    test_7: "تست ۷",
    test_4_a: "تست ۴",
    test_4_b: "تست ۵",
    test_1: "تست ۱",
    test_2: "تست ۲",
    test_3: "تست ۳",
    test_6: "تست ۶",
  };

  const statusLabels = {
    in_progress: "در حال انجام",
    at_consultant: "نزد مشاور",
    at_headquarters: "در ستاد",
    statement_preparation: "تهیه صورت‌وضعیت",
    at_finance: "در امور مالی",
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFilters((previousFilters) => ({
      ...previousFilters,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      year: "",
      month: "",
      city_id: "",
      activity_id: "",
      status_id: "",
    });
  };

  return (
    <section className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-white">فیلتر گزارش</h3>

          <p className="mt-1 text-xs text-gray-500">
            اطلاعات داشبورد را بر اساس فیلترهای موردنظر مشاهده کنید
          </p>
        </div>

        <button
          onClick={resetFilters}
          className="
            flex items-center gap-2
            rounded-xl
            border border-gray-700
            px-3 py-2
            text-xs text-gray-400
            transition
            hover:border-gray-600
            hover:bg-gray-800
            hover:text-white
          "
        >
          <RotateCcw size={15} />
          پاک کردن فیلترها
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* Year */}

        <FilterSelect
          label="سال"
          name="year"
          value={filters.year}
          onChange={handleChange}
        >
          <option value="">همه سال‌ها</option>

          {options.years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </FilterSelect>

        {/* Month */}

        <FilterSelect
          label="ماه"
          name="month"
          value={filters.month}
          onChange={handleChange}
        >
          <option value="">همه ماه‌ها</option>

          {options.months.map((month) => (
            <option key={month} value={month}>
              ماه {month}
            </option>
          ))}
        </FilterSelect>

        {/* City */}

        <FilterSelect
          label="شهر"
          name="city_id"
          value={filters.city_id}
          onChange={handleChange}
        >
          <option value="">همه شهرها</option>

          {options.cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </FilterSelect>

        {/* Activity */}

        <FilterSelect
          label="فعالیت"
          name="activity_id"
          value={filters.activity_id}
          onChange={handleChange}
        >
          <option value="">همه فعالیت‌ها</option>

          {options.activities.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activityNames[activity.name] || activity.name}
            </option>
          ))}
        </FilterSelect>

        {/* Status */}

        <FilterSelect
          label="وضعیت"
          name="status_id"
          value={filters.status_id}
          onChange={handleChange}
        >
          <option value="">همه وضعیت‌ها</option>

          {options.statuses.map((status) => (
            <option key={status.id} value={status.id}>
              {statusLabels[status.name] || status.name}
            </option>
          ))}
        </FilterSelect>
      </div>
    </section>
  );
};

const FilterSelect = ({ label, children, ...props }) => {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-gray-400">
        {label}
      </label>

      <select
        {...props}
        className="
          w-full
          rounded-xl
          border border-gray-700
          bg-gray-950
          px-4 py-3
          text-sm text-gray-200
          outline-none
          transition
          focus:border-blue-500
          focus:ring-1
          focus:ring-blue-500
        "
      >
        {children}
      </select>
    </div>
  );
};

export default FilterBar;
