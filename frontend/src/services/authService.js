import API from "./api";

// Register
export const registerUser = async (userData) => {
  const { data } = await API.post("/auth/register", userData);
  return data;
};

// Login
export const loginUser = async (userData) => {
  const { data } = await API.post("/auth/login", userData);
  return data;
};

// Logout
export const logoutUser = async () => {
  const { data } = await API.post("/auth/logout");
  return data;
};

// Current User
export const getCurrentUser = async () => {
  const { data } = await API.get("/auth/me");
  return data;
};
