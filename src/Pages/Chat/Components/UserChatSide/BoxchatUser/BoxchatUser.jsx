import classNames from 'classnames';
import PropTypes from 'prop-types';
import { memo, useContext } from 'react';
import { DefaultAvatar } from '../../../../../assets/avatar/index';
import { AppContext } from '../../../../../Context/AppContext';
import { ChatContext } from '../../../../../Context/ChatContext';
import './BoxchatUser.scss';

function BoxchatUser({ avatarLink, name, lastMsg, statusRead, statusOnline, time, roomId, userId, rating }) {

     const { room, setRoom, setOppositeUser } = useContext(ChatContext);
     const { userLogin } = useContext(AppContext);
     const date = new Date(time);
     const timeProcessed = `${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}`;

     console.log('re-render')

     const handleSelectChat = () => {
          setRoom(roomId);
          setOppositeUser({ avatarLink, name, userId, rating });
     }

     return (
          <div
               className={classNames('boxchat-user', { 'current': room == roomId })}
               onClick={handleSelectChat}
          >
               <div className="avatar-block">
                    <img src={avatarLink || DefaultAvatar} alt="" className='avatar-img' />
                    {statusOnline ? <span className="status-online">.</span> : ''}
               </div>
               <div className="text-block">
                    <h1 className="name">{name}</h1>
                    <p className="last-msg">{lastMsg.sender._id == userLogin._id ? 'Bạn: ' : ""}{lastMsg.message}</p>
               </div>
               <div className="more-block">
                    <p className="time">{timeProcessed}</p>
                    {statusRead ? <span className="unread">.</span> : ''}
               </div>
          </div>
     );
}

export default memo(BoxchatUser);

BoxchatUser.propTypes = {
     avatarLink: PropTypes.string,
     name: PropTypes.string,
     lastMsg: PropTypes.object,
     statusRead: PropTypes.bool,
     statusOnline: PropTypes.bool,
     current: PropTypes.bool,
     time: PropTypes.string,
     setRoom: PropTypes.func,
     roomId: PropTypes.any,
     userId: PropTypes.string,
     rating: PropTypes.number
}