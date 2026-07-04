import API from "./api";

// Get all saved locations
export const getSavedLocations = async () => {
  const { data } = await API.get("/locations");
  return data;
};

// Save location
export const saveLocation = async (city_name, country = "Unknown") => {
  const { data } = await API.post("/locations", {
    city_name,
    country,
  });

  return data;
};

// Delete location
export const deleteLocation = async (id) => {
  const { data } = await API.delete(`/locations/${id}`);
  return data;
};
