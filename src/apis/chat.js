import axios from 'axios';
const baseURL = import.meta.env.VITE_APP_API_URL;
// const baseURL = 'http://localhost:3000';

export const getAllChat = async (id) => {
     try {
          const url = baseURL + '/chat';
          return await axios.get(url, {
               params: { rootUserID: id }
          });
     } catch (error) {
          console.log(`Error at getAllChat (apis/chat.js):  ${error}`);
     }
}

export const ratingUser = async (partnerID, stars) => {
     try {
          const url = `${baseURL}/star/rate`;
          return await axios.post(url, {
               partnerID, stars
          });
     } catch (error) {
          console.log(`Error at ratingUser: ${error}`);
     }
}

