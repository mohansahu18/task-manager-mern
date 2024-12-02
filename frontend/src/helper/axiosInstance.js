import axios from 'axios';
const REACT_APP_API_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: REACT_APP_API_URL,
  timeout: 10000,

});

