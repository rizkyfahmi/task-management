import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://task-management-backend-five.vercel.app',
});

export default api;