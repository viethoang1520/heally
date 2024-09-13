import axios from "axios";
const token = localStorage.getItem('token');

const axiosClient = axios.create({
     baseURL: import.meta.env.VITE_APP_API_URL,
     headers: {
          Authorization: JSON.parse(token)
     }
});

export default axiosClient;