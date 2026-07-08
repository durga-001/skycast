import API from "./api";

// Current weather
export const getWeather = async (city) => {
  const { data } = await API.get(`/weather/${city}`);
  return data;
};

// 5-day Forecast
export const getForecast = async (city) => {
  const { data } = await API.get(`/forecast/${city}`);
  return data;
};

// Weather by coordinates
export const getWeatherByCoords = async (lat, lon) => {
  const { data } = await API.get("/coords", {
    params: { lat, lon },
  });

  return data;
};

// Weather news
export const getWeatherNews = async () => {
  const { data } = await API.get("/news");
  return data;
};

export const getAirQuality = async (lat, lon) => {
  const response = await API.get(`/air-quality?lat=${lat}&lon=${lon}`);

  return response.data;
};