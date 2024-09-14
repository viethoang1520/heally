import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

function PrivateRouteComp({ children }) {
     let isAuthenticated = false;
     const token = localStorage.getItem('token');
     
     if (token) {
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