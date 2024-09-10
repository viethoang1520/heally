import { memo, useContext, useEffect, useRef } from 'react';
import { ChatContext } from '../../Context/ChatContext';
import './Chat.scss';
import { ChatboxInside, ChatProfile, UserChatSide } from './Components';
import { Col, Empty, Row } from 'antd';
import { io } from 'socket.io-client';
import { AppContext } from '../../Context/AppContext';
import { toast } from 'sonner';

const URL = import.meta.env.VITE_APP_API_URL;


function Chat() {
     const { setNewMessage, room } = useContext(ChatContext);
     const { userLogin } = useContext(AppContext);
     const socketRef = useRef(null);

     //SET UP SOCKET IO:
     useEffect(() => {
          socketRef.current = io(URL);
          socketRef.current.emit("setup", userLogin);
          socketRef.current.on("connected", () => {
               console.log("Connected");
          });

          return () => {
               socketRef.current.disconnect();
               console.log("Socket disconnected");
          }
     }, [userLogin]);

     // useEffect(() => {
     //      socketRef.current.emit("setup", userLogin);
     //      socketRef.current.on("connected", () => {
     //           console.log("Connected");
     //      });

     //      return () => {
     //           socketRef.current.disconnect();
     //           console.log("Socket disconnected");
     //      }
     // }, [userLogin]);

     // SOCKET IO (RECEIVE NEW MESSAGE):
     useEffect(() => {
          const handleMessageReceived = (newMess) => {
               console.log(newMess)
               setNewMessage(newMess);
               if (newMess.chatID._id !== room) {
                    toast.message(`${newMess.sender.nickname}:`, {
                         description: `${newMess.message.length > 25 ? newMess.message.slice(0, 25) + '...' : newMess.message}`,
                         position: "bottom-right"
                    });
               }
          }

          socketRef.current.on("message received", handleMessageReceived);

          return () => {
               socketRef.current.off("message received", handleMessageReceived);
          };
     }, [room, setNewMessage]);

     return (
          <div className='chat-page'>
               <Row>
                    <Col xs={0} md={8} lg={6} className="chat-side-block">
                         <UserChatSide />
                    </Col>

                    <Col xs={24} md={16} lg={12} style={{ padding: '12px' }} className="chat-inside-block">
                         {room != 0 ? <ChatboxInside socketRef={socketRef.current} /> : <Empty fontSize={5} style={{ backgroundColor: 'rgba(128, 128, 128, 0.153)', borderRadius: '20px', height: '94.5vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }} description='Chọn tin nhắn để bắt đầu trò chuyện' />}
                    </Col>

                    <Col xs={0} md={0} lg={6} className="chat-info">
                         {room != 0 ? <ChatProfile /> : <div />}
                    </Col>


               </Row>
               {/* <div className='not-sp-noti'>
                    <img src="https://www.shutterstock.com/image-vector/page-not-found-concept-404-600nw-708727921.jpg" alt="" className="not-sp-img" />
               </div> */}
          </div>
     );
}

export default memo(Chat);

