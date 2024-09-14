import axiosClient from './axiosClient';
// import axios from "axios";

export const getAllChat = async (id) => {
     try {
          const url = '/chat';
          const token = localStorage.getItem('token');
          return await axiosClient(token).get(url, {
               params: { rootUserID: id },
          });
     } catch (error) {
          console.log(`Error at getAllChat (apis/chat.js):  ${error}`);
     }
}

export const ratingUser = async (partnerID, stars) => {
     try {
          const url = `/star/rate`;
          const token = localStorage.getItem('token');
          return await axiosClient(token).post(url, {
               partnerID, stars,
          });
     } catch (error) {
          console.log(`Error at ratingUser: ${error}`);
     }
}

