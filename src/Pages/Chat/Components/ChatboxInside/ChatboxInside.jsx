import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ScrollableFeed from 'react-scrollable-feed';
import { io } from 'socket.io-client';
import { getChatMessage, sendMessage } from "../../../../apis/message";
import OnTyping from "../../../../Components/OnTyping/OnTyping";
import { AppContext } from "../../../../Context/AppContext";
import { ChatContext } from "../../../../Context/ChatContext";
import './ChatboxInside.scss';
import ChatContent from "./ChatContent/ChatContent";

const URL = import.meta.env.VITE_APP_API_URL;

function ChatboxInside() {
     const socketRef = useRef();
     let selectChatCompare = useRef(null);
     const [listMessage, setListMessage] = useState([]);
     const { userLogin } = useContext(AppContext);
     const { room, oppositeUser } = useContext(ChatContext);
     const [isTyping, setIsTyping] = useState(false);
     const [textMsg, setTextMsg] = useState("");

     useEffect(() => {
          socketRef.current = io(URL);

          return () => {
               socketRef.current.disconnect();
          }
     }, []);

     useEffect(() => {
          if (room) {
               socketRef.current.emit("setup", userLogin);
               socketRef.current.on("connected", () => {
                    console.log("Connected");
               });
          }

          return () => {
               socketRef.current.disconnect();
               console.log("Socket disconnected");
          }
     }, []);

     const handleTypingMsg = (e) => {
          setTextMsg(e.target.value);
          // if (e.target.value == "" && isTyping) {
          //      socketRef.current.emit('stop typing', room);
          // } else if (e.target.value != "" && !isTyping) {
          //      socketRef.current.emit('typing', room);
          // }
     };

     //partnerID: , stars:  

     useEffect(() => {
          socketRef.current.on("message received", (newMess) => {
               // console.log('room in: ' + room);
               console.log('chat compare: ' + selectChatCompare.current);
               console.log(newMess);
               if (newMess.chatID._id == selectChatCompare.current) {
                    setListMessage(prevListMessage => [...prevListMessage, { message: newMess.message, sender: { _id: newMess.sender._id } }]);
               }
          });
     }, []);

     // useEffect(() => {
     //      socketRef.current.on("typing", () => {
     //           setIsTyping(true);
     //      });
     //      socketRef.current.on("stop typing", () => {
     //           setIsTyping(false);
     //      });
     // }, []);

     const handleSendMsg = async (e) => {
          e.preventDefault();
          if (textMsg != '') {
               setListMessage([...listMessage, { message: textMsg, sender: { _id: userLogin._id } }]);
               const { data } = await sendMessage(userLogin._id, room, textMsg);
               socketRef.current.emit("new message", data.message);
               socketRef.current.emit('stop typing', oppositeUser.userId);
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
               socketRef.current.emit("join room", room);
          }
          selectChatCompare.current = room;
     }, [room]);

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
                    <ScrollableFeed className="scrollable-feed">
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

export default ChatboxInside;