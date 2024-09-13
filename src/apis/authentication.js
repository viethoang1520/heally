import axios from 'axios';
import axiosClient from './axiosClient';
const baseURL = import.meta.env.VITE_APP_API_URL;

export const registerUser = async ({ username, name, password, confirmPassword }) => {
     try {
          const url = baseURL + '/register/validate';
          return await axios.post(url, { username, name, password, confirmPassword });
     } catch (error) {
          console.log('Error at REGISTER USER API: ' + error);
     }
}

export const loginUser = async ({ username, password }) => {
     try {
          const url = baseURL + '/login/validate';
          return await axios.post(url, { username, password });
     } catch (error) {
          console.log('Error at LOGIN USER API: ' + error);
     }
}

export const addInformation = async ({ userID, avatar, gender, nickname, oppositeGender }) => {
     try {
          const url = baseURL + '/register/add';
          return await axiosClient.post(url, { userID, avatar, gender, nickname, oppositeGender });
     } catch (error) {
          console.log('Error at ADD INFORMATION API: ' + error);
     }
}

export const getUser = async (userID) => {
     try {
          const url = `${baseURL}/user`;
          return await axios.get(url, {
               params: {
                    userID
               }
          })
     } catch (error) {
          console.log('Error at GET USER API: ' + error);
     }
}

export const isValidUser = async () => {
     try {
          const token = localStorage.getItem('token');
          return await axiosClient.get(`/user/valid`, {
               headers: { Authorization: JSON.parse(token) },
          });
     } catch (error) {
          console.log('Error at isValidUser: ' + error);
     }
}

export const logout = async () => {
     try {
          return await axiosClient.get('logout');
     } catch (error) {
          console.log(error);
     }
}
