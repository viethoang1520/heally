import { createContext, useLayoutEffect, useState } from "react";
import PropTypes from 'prop-types';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
     const [isLoading, setIsLoading] = useState(false);
     const [room, setRoom] = useState("")
     const [userLogin, setUserLogin] = useState(JSON.parse(sessionStorage.getItem('userLogin')));
     const [theme, setTheme] = useState('light-theme');
     const [registerSideInfor, setRegisterSideInfor] = useState({ userID: '', avatar: '', gender: '', nickname: '', oppositeGender: '' });

     useLayoutEffect(() => {
          const user = sessionStorage.getItem('userLogin');

          if (user) {
               setUserLogin(JSON.parse(user));
          }
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
               setTheme
          }}
     >
          {children}
     </AppContext.Provider>
}

AppProvider.propTypes = {
     children: PropTypes.node
}