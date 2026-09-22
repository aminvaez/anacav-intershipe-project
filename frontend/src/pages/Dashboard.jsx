import { useEffect, useState } from "react";

import Header from "../components/Header";
import StatusBox from "../components/StatuseBox";
import FilterBar from "../components/FilterBar";
import MonthlyChart from "../components/MonthlyChart";
import StatusChart from "../components/StatusChart";
import ActivityChart from "../components/ActivityChart";
import CityChart from "../components/CityChart";

import {
  getSummary,
  getMonthly,
  getStatuses,
  getActivities,
  getCities,
  getFilterOptions,
} from "../services/api";


const Dashboard = () => {
  // -------------------------
  // Filter state
  // -------------------------

  const [filters, setFilters] = useState({
    year: "",
    month: "",
    city_id: "",
    activity_id: "",
    status_id: "",
  });

  const [filterOptions, setFilterOptions] = useState({
    years: [],
    months: [],
    cities: [],
    activities: [],
    statuses: [],
  });


  // -------------------------
  // Dashboard data
  // -------------------------

  const [summary, setSummary] = useState(null);
  const [monthly, setMonthly] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [activities, setActivities] = useState([]);
  const [cities, setCities] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // -------------------------
  // Load filter options
  // فقط یک بار
  // -------------------------

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const data = await getFilterOptions();

        setFilterOptions(data);
      } catch (error) {
        console.error(
          "Failed to load filter options:",
          error
        );
      }
    };

    loadFilterOptions();
  }, []);


  // -------------------------
  // Load dashboard
  // هر بار filters تغییر کند
  // -------------------------

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const [
          summaryData,
          monthlyData,
          statusData,
          activityData,
          cityData,
        ] = await Promise.all([
          getSummary(filters),
          getMonthly(filters),
          getStatuses(filters),
          getActivities(filters),
          getCities(filters),
        ]);

        setSummary(summaryData);
        setMonthly(monthlyData);
        setStatuses(statusData);
        setActivities(activityData);
        setCities(cityData);

      } catch (error) {
        console.error(error);

        setError(
          "خطا در دریافت اطلاعات داشبورد"
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();

  }, [filters]);


  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gray-950"
    >
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

          <FilterBar
            filters={filters}
            setFilters={setFilters}
            options={filterOptions}
          />


          {error && (
            <div className="rounded-xl border border-red-900 bg-red-950/30 p-4 text-sm text-red-400">
              {error}
            </div>
          )}


          {loading ? (
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-10 text-center text-gray-400">
              در حال دریافت اطلاعات...
            </div>
          ) : (
            <>
              <StatusBox summary={summary} />

              <MonthlyChart data={monthly} />

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <StatusChart data={statuses} />

                <ActivityChart data={activities} />
              </div>

              <CityChart data={cities} />
            </>
          )}

        </div>
      </main>
    </div>
  );
};

export default Dashboard;