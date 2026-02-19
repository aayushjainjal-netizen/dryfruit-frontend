import axios from "axios";

const API = axios.create({
 baseURL: "https://dryfruit-backend-2.onrender.com",
});

// 🔐 Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// AUTH
export const loginUser = (data) => API.post("/auth/login", data);

// CART
export const addToCart = (data) => API.post("/cart/add", data);
export const getCart = () => API.get("/cart");
export const removeFromCart = (productId) =>
  API.delete(`/cart/remove/${productId}`);

export default API;
