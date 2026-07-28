// const BASE_URL = "http://localhost:8088/api";
const BASE_URL = "https://backend-nvbr.onrender.com/api";

export const getWeather = async (date?: string) => {
  try {
    const url = date
      ? `${BASE_URL}/weather/daily?date=${date}`
      : `${BASE_URL}/weather/daily`;
    const response = await fetch(url);
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

export const getWeatherRange = async (from: string, to: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather/range?from=${from}&to=${to}`,
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
