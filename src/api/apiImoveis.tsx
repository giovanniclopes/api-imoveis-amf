import axios from "axios";

const apiLink = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const fetchImoveis = async () => {
  const response = await apiLink.get("/");
  return response.data;
};
