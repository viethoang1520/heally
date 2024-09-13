import axiosClient from './axiosClient';

export const getTypeAvatar = async () => {
     try {
          const url = `/avatar/type`
          return await axiosClient.get(url);
     } catch (error) {
          console.log(`Error at getTypeAvatar (avatar.js): ${error}`);
     }
}

export const getAvatar = async (type) => {
     try {
          const url = `/avatar`;
          return await axiosClient.get(url, {
               params: {
                    type
               }
          });
     } catch (error) {
          console.log(`Error at getAvatar (avatar.js): ${error}`);
     }
}
