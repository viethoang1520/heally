import './AvatarRipple.scss';
import propTypes from 'prop-types';
import classNames from 'classnames';

function AvatarRipple({ linkAvatar, isFinding }) {
     return (
          <div className='avatar-ripple'>
               <div className={classNames("circles", { 'finding': isFinding })}>
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                    <div className="circle3"></div>
                    <img className='avatar-img' src={linkAvatar} alt="" />
               </div>
               
          </div>
     );
}

export default AvatarRipple;

AvatarRipple.propTypes = {
     linkAvatar: propTypes.string, 
     isFinding: propTypes.bool
}