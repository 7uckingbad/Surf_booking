const BASE_URL = "http://localhost:8088/api";

export const getWeather = async () => {
  try {
    const response = await fetch(`${BASE_URL}/weather`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPacks = async (page = 0, size = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/packs?page=${page}&size=${size}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
