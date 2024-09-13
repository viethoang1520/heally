import axiosClient from './axiosClient';

export const getChatMessage = async (chatID) => {
     const url = `/message`;
     try {
          return axiosClient.get(url, {
               params: {
                    chatID
               }
          });
     } catch (error) {
          console.log(error);
     }
}

export const sendMessage = async (rootUserID, chatID, message) => {
     const url = `/message`;
     try {
          return axiosClient.post(url, {
               rootUserID, chatID, message
          });
     } catch (error) {
          console.log(`Error at sendMessage (/message.js): ${error}`);
     }
}