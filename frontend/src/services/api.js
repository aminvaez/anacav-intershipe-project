const API_BASE_URL = "http://127.0.0.1:5000/api";

const fetchData = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
};

export const getSummary = () => fetchData("/summary");
export const getMonthly = () => fetchData("/monthly");
export const getStatuses = () => fetchData("/statuses");
export const getActivities = () => fetchData("/activities");
export const getCities = () => fetchData("/cities");
