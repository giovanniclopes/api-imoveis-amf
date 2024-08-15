import axios from 'axios';

const apiLink = axios.create({
  baseURL: "https://api.estagio.amfernandes.com.br/imoveis",
});

export const fetchImoveis = async () => {
  const response = await apiLink.get("/");
  return response.data;
}