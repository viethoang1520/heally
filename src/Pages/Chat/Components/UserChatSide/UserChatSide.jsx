import './UserChatSide.scss';
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import BoxchatUser from "./BoxchatUser/BoxchatUser";
import { memo, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../../Context/AppContext';
import { DefaultAvatar } from '../../../../assets/avatar';
import { getAllChat } from '../../../../apis/chat';
import { ChatContext } from '../../../../Context/ChatContext';
import { Empty } from 'antd';

function UserChatSide() {
     const [search, setSearch] = useState('');
     const { userLogin } = useContext(AppContext);
     const { setRoom } = useContext(ChatContext);
     const [listChat, setListChat] = useState([]);
     const { setIsLoading } = useContext(AppContext);

     function removeAccents(str) {
          return str.normalize('NFD')
               .replace(/[\u0300-\u036f]/g, '')
               .replace(/đ/g, 'd').replace(/Đ/g, 'D')
               .toLowerCase()
     }

     useEffect(() => {
          if (userLogin._id) {
               const fetchData = async () => {
                    setIsLoading(true);
                    try {
                         const { data } = await getAllChat(userLogin._id);
                         console.log(data.message);
                         setListChat(data.message);
                    } finally {
                         setIsLoading(false);
                    }
               }
               fetchData();
          }
     }, [userLogin._id, setIsLoading]);

     return (
          <div className="user-chat-side">
               <div className='user-info'>
                    <div className="avatar-block">
                         <img src={userLogin.avatar.link || DefaultAvatar}
                              alt=""
                              className='user-avatar'
                         />
                         <span className="tick-online">.</span>
                    </div>

                    <h1 className='user-name'>{userLogin.full_name}</h1>
                    <div className='status'>
                         <span className="text">Hoạt động</span>
                         <Icon icon="mdi:tick-all" />
                    </div>
               </div>

               <div className="message-block">
                    <div className="search-block">
                         <input
                              type="text"
                              className="input-block"
                              placeholder="Tìm kiếm người dùng"
                              onChange={(e) => setSearch(e.target.value)}
                              spellCheck={false}
                         />
                         <Icon icon="material-symbols:search" className="icon" />
                    </div>

                    <p className="last-msg-text">Tin nhắn cuối</p>

                    <div className="list-boxchat">
                         {listChat.filter((userSearch) => {
                              return (
                                   search.toLowerCase === ''
                                        ? userSearch
                                        : removeAccents(userSearch.oppositeUser.nickname).includes(removeAccents(search))
                              )
                         }).length > 0
                              ? listChat.filter((userSearch) => {
                                   return (
                                        removeAccents(search).toLowerCase === ''
                                             ? userSearch
                                             : removeAccents(userSearch.oppositeUser.nickname).includes(removeAccents(search))
                                   )
                              }).map((user, index) => {
                                   return (
                                        <BoxchatUser
                                             key={index}
                                             avatarLink={user.chatAvatar}
                                             name={user.oppositeUser.nickname}
                                             lastMsg={user.latestMessage}
                                             time={user.latestMessage.createdAt}
                                             statusOnline={user.statusOnline}
                                             statusRead={user.statusRead}
                                             // current={user.current}
                                             setRoom={setRoom}
                                             roomId={user._id}
                                             userId={user.oppositeUser._id}
                                             rating={user.userRating}
                                        />
                                   )
                              })
                              : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={`Không tìm thấy '${search}'`} />
                         }
                    </div>
               </div>
          </div>
     );
}

export default memo(UserChatSide);