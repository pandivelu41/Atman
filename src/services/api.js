/**
 * Services file containing all API calls for the dashboard.
 */

// 1. Fetch Crypto Prices from CoinCap API
export const fetchCryptoPrices = async () => {
  try {
    const response = await fetch("https://api.coincap.io/v2/assets?limit=6");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.data; // Array of crypto objects
  } catch (error) {
    console.error("Error fetching crypto prices:", error);
    throw error;
  }
};

// 2. Fetch Cars from our local mock API
export const fetchCars = async () => {
  try {
    const response = await fetch("/api/cars.json");
    console.log(await response.json());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching cars data:", error);
    throw error;
  }
};

// 3. Fetch User Profiles from JSONPlaceholder
export const fetchUsers = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching users data:", error);
    throw error;
  }
};
