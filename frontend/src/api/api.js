// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api", // your backend
// });

// export default API;


import axios from "axios";

const API = axios.create({
  baseURL: "https://kreedakriti.onrender.com/api", // your backend URL
});

// Add token to requests automatically
API.interceptors.request.use(config => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;

