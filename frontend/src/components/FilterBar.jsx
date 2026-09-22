const FilterBar = () => {
  return (
    <section className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
      <div className="mb-4">
        <h3 className="font-semibold text-white">
          فیلتر گزارش
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          اطلاعات داشبورد را بر اساس فیلترهای موردنظر مشاهده کنید
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <FilterSelect
          label="سال"
          options={["همه سال‌ها", "1401"]}
        />

        <FilterSelect
          label="ماه"
          options={["همه ماه‌ها", "7", "8", "9"]}
        />

        <FilterSelect
          label="شهر"
          options={[
            "همه شهرها",
            "شهر 1",
            "شهر 2",
            "شهر 3",
          ]}
        />

        <FilterSelect
          label="فعالیت"
          options={[
            "همه فعالیت‌ها",
            "test_1",
            "test_2",
            "test_3",
          ]}
        />
      </div>
    </section>
  );
};

const FilterSelect = ({ label, options }) => {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-gray-400">
        {label}
      </label>

      <select className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-gray-200 outline-none transition focus:border-blue-500">
        {options.map((option) => (
          <option key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;