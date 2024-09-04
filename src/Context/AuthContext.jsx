import { createContext, useLayoutEffect, useState } from "react";
import PropTypes from 'prop-types';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
     const [userLogin, setUserLogin] = useState(JSON.parse(sessionStorage.getItem('userLogin')));
     const [registerSideInfor, setRegisterSideInfor] = useState({ userID: '', avatar: '', gender: '', nickname: '', oppositeGender: '' });

     useLayoutEffect(() => {
          const user = sessionStorage.getItem('userLogin');

          if (user) {
               setUserLogin(JSON.parse(user));
          }
     }, []);

     return <AuthContext.Provider
          value={{
               userLogin, 
               setUserLogin,
               registerSideInfor,
               setRegisterSideInfor
          }}
     >
          {children}
     </AuthContext.Provider>
}

AuthProvider.propTypes = {
     children: PropTypes.node
}