import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { memo, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ScrollableFeed from 'react-scrollable-feed';
import propTypes from 'prop-types';
// import { io } from 'socket.io-client';
import { getChatMessage, sendMessage } from "../../../../apis/message";
import OnTyping from "../../../../Components/OnTyping/OnTyping";
import { AppContext } from "../../../../Context/AppContext";
import { ChatContext } from "../../../../Context/ChatContext";
import './ChatboxInside.scss';
import ChatContent from "./ChatContent/ChatContent";

function ChatboxInside({ socketRef }) {
     let selectChatCompare = useRef(null);
     const [listMessage, setListMessage] = useState([]);
     const { userLogin } = useContext(AppContext);
     const { room, oppositeUser, setNewMessage, newMessage } = useContext(ChatContext);
     const [isTyping, setIsTyping] = useState(false);
     const [textMsg, setTextMsg] = useState("");

     const [checkIsTyping, setCheckIsTyping] = useState(false);

     const handleTypingMsg = useCallback((e) => {
          setTextMsg(e.target.value);

          if (e.target.value != '' && !checkIsTyping) {
               socketRef.emit('typing', room);
               setCheckIsTyping(true);
          } else if (e.target.value == '' && checkIsTyping) {
               socketRef.emit('stop typing', room);
               setCheckIsTyping(false);
          }
     }, [checkIsTyping, setCheckIsTyping, socketRef, room]);

     useEffect(() => {
          if (newMessage) {
               if (newMessage.sender._id != userLogin._id) {
                    if (newMessage.chatID._id == selectChatCompare.current) {
                         setListMessage(prevListMessage => [...prevListMessage, { message: newMessage.message, sender: { _id: newMessage.sender._id } }]);
                    }
               }
          }
     }, [newMessage, userLogin]);

     useEffect(() => {
          if (socketRef) {
               socketRef.on("typing", () => {
                    console.log('typing')
                    setIsTyping(true);
               });
               socketRef.on("stop typing", () => {
                    console.log('stop')
                    setIsTyping(false);
               });
          }
     }, [socketRef]);

     const handleSendMsg = async (e) => {
          e.preventDefault();
          if (textMsg != '') {
               setListMessage([...listMessage, { message: textMsg, sender: { _id: userLogin._id } }]);
               setNewMessage({ message: textMsg, sender: { _id: userLogin._id }, chatID: { _id: room } });
               const { data } = await sendMessage(userLogin._id, room, textMsg);
               socketRef.emit("new message", data.message);
               setTextMsg('');
               socketRef.emit('stop typing', room);
               setCheckIsTyping(false);
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
                    socketRef.emit("join room", room);
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
                         {isTyping && <OnTyping />}
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