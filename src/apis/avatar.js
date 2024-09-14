import axiosClient from './axiosClient';

export const getTypeAvatar = async () => {
     try {
          const url = `/avatar/type`;
          const token = localStorage.getItem('token');
          return await axiosClient(token).get(url);
     } catch (error) {
          console.log(`Error at getTypeAvatar (avatar.js): ${error}`);
     }
}

export const getAvatar = async (type) => {
     try {
          const url = `/avatar`;
          const token = localStorage.getItem('token');
          return await axiosClient(token).get(url, {
               params: {
                    type
               }
          });
     } catch (error) {
          console.log(`Error at getAvatar (avatar.js): ${error}`);
     }
}
