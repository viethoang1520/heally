import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import classNames from 'classnames';
import propTypes from 'prop-types';
import { useContext } from 'react';
import { ButtonUnlock } from '../../../../../Components';
import { AppContext } from '../../../../../Context/AppContext';
import './Avatar.scss';

function Avatar({ avatar, id, price }) {

     const { registerSideInfor, setRegisterSideInfor } = useContext(AppContext);

     const handleSelect = () => {
          if (price == 0) {
               setRegisterSideInfor({ ...registerSideInfor, avatar: id });
          }
     }

     return (
          <div className={classNames('avatar', { 'selected': registerSideInfor.avatar == id }, { 'member': price > 0 })}>
               <img src={avatar} alt="" className="avatar-img" onClick={handleSelect} draggable="false" />
               <Icon className={classNames('icon', { 'show': registerSideInfor.avatar == id })} icon="uim:check-circle" />
               {/* <Icon className='member-icon' icon="f7:money-dollar-circle-fill" /> */}
               <div className='btn-unlock'><ButtonUnlock /></div>

          </div>
     )
}

export default Avatar;

Avatar.propTypes = {
     avatar: propTypes.string,
     id: propTypes.string,
     avatarSelect: propTypes.any,
     setAvatarSelect: propTypes.func,
     price: propTypes.any
}

