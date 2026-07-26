import API from "./api";

export const getWardrobe = async () => {
  const { data } = await API.get("/wardrobe");
  return data;
};

export const addWardrobeItem = async (item) => {
  const { data } = await API.post("/wardrobe", item);
  return data;
};

export const deleteWardrobeItem = async (id) => {
  const { data } = await API.delete(`/wardrobe/${id}`);
  return data;
};
