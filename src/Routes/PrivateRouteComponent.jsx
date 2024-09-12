import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useContext } from "react";
import { AppContext } from '../Context/AppContext';

function PrivateRouteComp({ children }) {
     let isAuthenticated = true;
     const { userLogin } = useContext(AppContext);

     if (userLogin !== null) {
          isAuthenticated = true;
     } else {
          isAuthenticated = false;
     }

     return (
          isAuthenticated ? children : <Navigate to='/login' />
     );
}

export default PrivateRouteComp;

PrivateRouteComp.propTypes = {
     children: PropTypes.any
}