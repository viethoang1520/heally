import axios from 'axios';
const baseURL = import.meta.env.VITE_APP_API_URL;

export const getChatMessage = async (chatID) => {
     const url = `${baseURL}/message`;
     try {
          return axios.get(url, {
               params: {
                    chatID
               }
          });
     } catch (error) {
          console.log(error);
     }
}

export const sendMessage = async (rootUserID, chatID, message) => {
     const url = `${baseURL}/message`;
     try {
          return axios.post(url, {
               rootUserID, chatID, message
          });
     } catch (error) {
          console.log(`Error at sendMessage (/message.js): ${error}`);
     }
}