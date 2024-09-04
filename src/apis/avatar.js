import axios from 'axios';

const baseURL = import.meta.env.VITE_APP_API_URL;

export const getTypeAvatar = async () => {
     try {
          const url = `${baseURL}/avatar/type`
          return await axios.get(url);
     } catch (error) {
          console.log(`Error at getTypeAvatar (avatar.js): ${error}`);
     }
}

export const getAvatar = async (type) => {
     try {
          const url = `${baseURL}/avatar`;
          return await axios.get(url, {
               params: {
                    type
               }
          });
     } catch (error) {
          console.log(`Error at getAvatar (avatar.js): ${error}`);
     }
}
