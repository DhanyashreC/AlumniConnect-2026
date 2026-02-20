import api from "./api";

// Register
export const registerUser = (data) => {
  return api.post("/auth/register", data);
};

// Login
export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);

  if (res.data?.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
};