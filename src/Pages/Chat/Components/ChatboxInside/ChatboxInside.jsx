import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { memo, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ScrollableFeed from 'react-scrollable-feed';
import propTypes from 'prop-types';
import { getChatMessage, sendMessage } from "../../../../apis/message";
import { AppContext } from "../../../../Context/AppContext";
import { ChatContext } from "../../../../Context/ChatContext";
import './ChatboxInside.scss';
import ChatContent from "./ChatContent/ChatContent";

function ChatboxInside() {
     let selectChatCompare = useRef(null);
     const [listMessage, setListMessage] = useState([]);
     const { userLogin, socketRef } = useContext(AppContext);
     const { room, oppositeUser, setNewMessage, newMessage } = useContext(ChatContext);
     const [textMsg, setTextMsg] = useState("");

     const handleTypingMsg = useCallback((e) => {
          setTextMsg(e.target.value);
     }, []);

     useEffect(() => {
          if (newMessage) {
               if (newMessage.sender._id != userLogin._id) {
                    if (newMessage.chatID._id == selectChatCompare.current) {
                         setListMessage(prevListMessage => [...prevListMessage, { message: newMessage.message, sender: { _id: newMessage.sender._id } }]);
                    }
               }
          }
     }, [newMessage, userLogin]);

     const handleSendMsg = async (e) => {
          e.preventDefault();
          console.log('send');
          if (textMsg != '') {
               setListMessage([...listMessage, { message: textMsg, sender: { _id: userLogin._id } }]);
               setNewMessage({ message: textMsg, sender: { _id: userLogin._id }, chatID: { _id: room } });
               const { data } = await sendMessage(userLogin._id, room, textMsg);
               socketRef.current.emit("new message", data.message);
               setTextMsg('');
          }
     }

     useEffect(() => {
          const fetchMessage = async (room) => {
               const { data } = await getChatMessage(room);
               setListMessage(data);
          }
          if (room) {
               fetchMessage(room);
               if (socketRef) {
                    socketRef.current.emit("join room", room);
               }
          }
          selectChatCompare.current = room;
     }, [room, socketRef]);

     return (
          <div className="chatbox-inside">
               <div className="top-navbar">
                    <h1 className="name">{oppositeUser.name}</h1>
                    <div className="button-block">
                         <Link className="button block">
                              <Icon icon="solar:user-block-line-duotone" className="icon" />
                         </Link>

                         <Link className="button avocado">
                              <Icon icon="ph:avocado" className="icon" />
                         </Link>
                    </div>
               </div>

               <div className="content">
                    <ScrollableFeed className="scrollable-feed" forceScroll startScrolledAtBottom>
                         {listMessage.map((msg, index) => {
                              return (
                                   <div key={index}>
                                        <ChatContent
                                             text={msg.message}
                                             receive={msg.sender._id == userLogin._id ? false : true}
                                             send={msg.sender._id == userLogin._id ? true : false}
                                        />
                                   </div>
                              )
                         })}
                    </ScrollableFeed>
               </div>

               <div className="input-block">

                    <Icon icon="mdi:emoticon-cool-outline" className="icon emoji" />

                    <form onSubmit={handleSendMsg} className="form-input">
                         <input
                              type="text"
                              value={textMsg}
                              className="input"
                              placeholder="Nhập tin nhắn ở đây...."
                              onChange={(e) => handleTypingMsg(e)}
                              autoFocus
                              spellCheck={false}
                         />
                    </form>
                    <Icon
                         icon="streamline:send-email-solid"
                         className="icon send"
                         onClick={handleSendMsg}
                    />
               </div>
          </div >
     );
}

export default memo(ChatboxInside);

ChatboxInside.propTypes = {
     socketRef: propTypes.any
}