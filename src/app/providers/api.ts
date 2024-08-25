import axios from "axios";

const provider = axios.create({
  baseURL: "https://fakestoreapi.com/",
});

provider.interceptors.response.use(
  (response) => response,
  (err) => Promise.reject({ ...err?.response?.data })
);

export default provider;
