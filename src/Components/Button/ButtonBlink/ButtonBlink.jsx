import './ButtonBlink.scss';
import propTypes from 'prop-types';

function ButtonBlink({ children }) {
     return (
          <div className="button-blink">
               <button className="btn">
                    <span className="text">{children}</span>
               </button>
          </div>
     );
}

export default ButtonBlink;

ButtonBlink.propTypes = {
     children: propTypes.any
}