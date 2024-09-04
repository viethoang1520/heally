import logo from '../../../assets/logo-heally.png';
import './LoadingVocado.scss';

function LoadingVocado() {
     return ( 
          <div className="loading-vocado overlay">
               <img className="logo-loading" src={logo} alt="" />
          </div>
      );
}

export default LoadingVocado;