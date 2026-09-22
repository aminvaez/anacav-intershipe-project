const API_BASE_URL = "http://127.0.0.1:5000/api";

const buildQueryString = (filters = {}) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      params.append(key, value);
    }
  });

  const queryString = params.toString();

  return queryString ? `?${queryString}` : "";
};

const fetchData = async (endpoint, filters = {}) => {
  const queryString = buildQueryString(filters);

  const response = await fetch(
    `${API_BASE_URL}${endpoint}${queryString}`
  );

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
};


// Dashboard data
export const getSummary = (filters) =>
  fetchData("/summary", filters);

export const getMonthly = (filters) =>
  fetchData("/monthly", filters);

export const getStatuses = (filters) =>
  fetchData("/statuses", filters);

export const getActivities = (filters) =>
  fetchData("/activities", filters);

export const getCities = (filters) =>
  fetchData("/cities", filters);


// Filter options
export const getFilterOptions = () =>
  fetchData("/filters");