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
  try {
    const res = await API.get("/auth/me", {
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    if (err.response?.status === 401) {
      return null;
    }

    throw err;
  }
};