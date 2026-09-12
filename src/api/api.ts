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

export const createBooking = async (bookingPayload: {
  fullName: string;
  rentalDate: string;
  issuanceTime: string;
  email: string;
  phoneNumber: string;
  participants: {
    name?: string;
    packId: number;
    instructorHours: number;
  }[];
}) => {
  try {
    const response = await fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingPayload),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const createPayment = async (paymentPayload: {
  bookingId: number;
  cardNumber: string;
  fullName: string;
  expiryDate: string;
  billingCountry: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": generateUUID(),
      },
      body: JSON.stringify(paymentPayload),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
