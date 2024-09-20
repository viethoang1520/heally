import axios from "axios";

const axiosClient = (token) => {
     return axios.create({
          baseURL: import.meta.env.VITE_APP_API_URL,
          headers: {
               Authorization: token
          }
     });
}

export default axiosClient;