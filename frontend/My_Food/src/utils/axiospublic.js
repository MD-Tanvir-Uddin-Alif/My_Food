import axios from "axios";

// const baseURL = 'http://127.0.0.1:8000';
const baseURL = 'https://my-food-nju8.onrender.com';

const axiosPublic = axios.create({
  baseURL,
  timeout: 80000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosPublic;