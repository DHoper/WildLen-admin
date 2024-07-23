import axios from "axios";

console.log(process.env.API_URL);

export const apiClient = axios.create({
  baseURL: process.env.API_URL,
});
