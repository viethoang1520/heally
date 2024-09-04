import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import PropTypes from 'prop-types';
import './UserCard.scss';
import { DefaultAvatar } from '../../../../assets/avatar/index';

function UserCard({ avatar, fullname, nickname, shortDes, location, rating, friends }) {
     return (
          <div className="user-card">
               <img src={avatar || DefaultAvatar} alt="" className='avatar' />
               <h1 className="fullname">{fullname}</h1>
               <p className="nickname">({nickname || 'Chưa có nickname'})</p>
               <p className='short-des'>{shortDes}</p>
               <hr />
               <div className='info-block'>
                    <p className='info location'>
                         <Icon icon="mdi:location" className='icon' />
                         {location || "Chưa có thông tin"}
                    </p>
                    <p className='info friends'>
                         <Icon icon="mingcute:user-follow-fill" className='icon' />
                         {friends} bạn bè
                    </p>
                    <p className='info rating'>
                         <Icon icon="fluent:person-star-16-filled" className='icon' />
                         {rating || 'Chưa có đánh giá'}
                    </p>
               </div>
          </div>
     );
}

export default UserCard;

UserCard.propTypes = {
     avatar: PropTypes.string,
     fullname: PropTypes.string,
     nickname: PropTypes.string,
     shortDes: PropTypes.string,
     location: PropTypes.string,
     rating: PropTypes.string,
     friends: PropTypes.string
}
