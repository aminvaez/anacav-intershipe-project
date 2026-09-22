import Header from "../components/Header";
import StatusBox from "../components/StatuseBox";
import FilterBar from "../components/FilterBar";
import MonthlyChart from "../components/MonthlyChart";
import StatusChart from "../components/StatusChart";
import ActivityChart from "../components/ActivityChart";
import CityChart from "../components/CityChart";

const Dashboard = () => {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-950">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-7">
          <h2 className="text-2xl font-bold text-white">
            نمای کلی
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            وضعیت و روند دستورکارهای ثبت‌شده
          </p>
        </div>

        <div className="space-y-6">
          <FilterBar />

          <StatusBox />

          <MonthlyChart />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <StatusChart />
            <ActivityChart />
          </div>

          <CityChart />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;