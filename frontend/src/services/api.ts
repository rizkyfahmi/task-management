import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://backend-gray-phi-82.vercel.app',
});

export default api;