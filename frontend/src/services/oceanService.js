import API from "./api";

export const getOceanWeather = async (lat, lon) => {
  const { data } = await API.get("/ocean/weather", { params: { lat, lon } });
  return data;
};

export const getSavedOceanLocations = async () => {
  const { data } = await API.get("/ocean/locations");
  return data;
};

export const saveOceanLocation = async (lat, lon, label) => {
  const { data } = await API.post("/ocean/locations", { lat, lon, label });
  return data;
};

export const deleteOceanLocation = async (id) => {
  const { data } = await API.delete(`/ocean/locations/${id}`);
  return data;
};
