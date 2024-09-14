import axiosClient from './axiosClient';

export const getChatMessage = async (chatID) => {
     const url = `/message`;
     const token = localStorage.getItem('token');
     try {
          return await axiosClient(token).get(url, {
               params: { chatID }
          });
     } catch (error) {
          console.log(error);
     }
}

export const sendMessage = async (rootUserID, chatID, message) => {
     const url = `/message`;
     const token = localStorage.getItem('token');
     try {
          return await axiosClient(token).post(url, {
               rootUserID, chatID, message
          });
     } catch (error) {
          console.log(`Error at sendMessage (/message.js): ${error}`);
     }
}