import PropTypes from 'prop-types';
import { createContext, useLayoutEffect, useRef, useState } from "react";
import { io } from 'socket.io-client';
const URL = import.meta.env.VITE_APP_API_URL;

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
     const [isLoading, setIsLoading] = useState(false);
     const [room, setRoom] = useState("")
     const [userLogin, setUserLogin] = useState(JSON.parse(sessionStorage.getItem('userLogin')));
     const [theme, setTheme] = useState('light-theme');
     const [registerSideInfor, setRegisterSideInfor] = useState({ userID: '', avatar: '', gender: '', nickname: '', oppositeGender: '' });
     const socketRef = useRef(null);

     useLayoutEffect(() => {
          const user = sessionStorage.getItem('userLogin');
          if (user) {
               setUserLogin(JSON.parse(user));
          }
     }, []);

     useLayoutEffect(() => {
          if (userLogin && !socketRef.current) {
               socketRef.current = io(URL);
               socketRef.current.emit("setup", userLogin);
               socketRef.current.on("connected", () => {
                    console.log("Connected (SOCKET IO)");
               });
          }

          return () => {
               socketRef.current?.disconnect();
               socketRef.current = null;
          };
     }, []);

     return <AppContext.Provider
          value={{
               userLogin,
               setUserLogin,
               room,
               setRoom,
               registerSideInfor,
               setRegisterSideInfor,
               isLoading,
               setIsLoading,
               theme,
               setTheme,
               socketRef
          }}
     >
          {children}
     </AppContext.Provider>
}

AppProvider.propTypes = {
     children: PropTypes.node
}