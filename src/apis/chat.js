import axiosClient from './axiosClient';
// import axios from "axios";

export const getAllChat = async (id) => {
     try {
          const url = '/chat';
          const token = localStorage.getItem('token');
          return await axiosClient.get(url, {
               params: { rootUserID: id },
               headers: {
                    Authorization: JSON.parse(token)
               }
          });
     } catch (error) {
          console.log(`Error at getAllChat (apis/chat.js):  ${error}`);
     }
}

export const ratingUser = async (partnerID, stars) => {
     try {
          const url = `/star/rate`;
          return await axiosClient.post(url, {
               partnerID, stars
          });
     } catch (error) {
          console.log(`Error at ratingUser: ${error}`);
     }
}

