const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchData = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return response.json();
};
