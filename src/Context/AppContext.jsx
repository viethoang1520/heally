import PropTypes from 'prop-types';
import { createContext, useLayoutEffect, useRef, useState } from "react";
import { io } from 'socket.io-client';
import { isValidUser } from '../apis/authentication';
const URL = import.meta.env.VITE_APP_API_URL;

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
     const [isLoading, setIsLoading] = useState(false);
     const [isSocketConnect, setIsSocketConnect] = useState(false);
     const [userLogin, setUserLogin] = useState();
     const [theme, setTheme] = useState('light-theme');
     const [registerSideInfor, setRegisterSideInfor] = useState({ userID: '', avatar: '', gender: '', nickname: '', oppositeGender: '' });
     const socketRef = useRef(null);

     useLayoutEffect(() => {
          const token = localStorage.getItem('token');
          const fetchUserToken = async () => {
               setIsLoading(true);
               const { data } = await isValidUser();
               if (data.user) {
                    setUserLogin(data.user);
               }
               setIsLoading(false);
          }
          if (JSON.parse(token)) {
               fetchUserToken();
          } else {
               setUserLogin(null);
          }
     }, []);

     useLayoutEffect(() => {
          if (userLogin) {
               socketRef.current = io(URL);
               socketRef.current.emit("setup", userLogin);
               socketRef.current.on("connected", () => {
                    console.log("Connected (SOCKET IO)");
                    setIsSocketConnect(true);
               });
          }

          return () => {
               if (socketRef.current) {
                    console.log('Disconnect');
                    // socketRef.current.disconnect();
                    // socketRef.current = null;
                    setIsSocketConnect(false);
               }
          };
     }, [userLogin]);

     return <AppContext.Provider
          value={{
               userLogin,
               setUserLogin,
               registerSideInfor,
               setRegisterSideInfor,
               isLoading,
               setIsLoading,
               theme,
               setTheme,
               socketRef,
               isSocketConnect,
          }}
     >
          {children}
     </AppContext.Provider>
}

AppProvider.propTypes = {
     children: PropTypes.node
}