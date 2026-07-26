import API from "./api";

export const getWeather = async (city) => {
  const { data } = await API.get(`/weather/${encodeURIComponent(city)}`);
  return data;
};

export const getForecast = async (city) => {
  const { data } = await API.get(`/forecast/${encodeURIComponent(city)}`);
  return data;
};

export const getWeatherByCoords = async (lat, lon) => {
  const { data } = await API.get("/coords", {
    params: { lat, lon },
  });

  return data;
};

export const getWeatherNews = async () => {
  const { data } = await API.get("/news");
  return data;
};

export const getAirQuality = async (lat, lon) => {
  const { data } = await API.get("/air-quality", {
    params: { lat, lon },
  });

  return data;
};
