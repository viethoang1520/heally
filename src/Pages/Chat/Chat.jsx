import { Col, Empty, Row } from 'antd';
import { memo, useContext, useEffect } from 'react';
import { AppContext } from '../../Context/AppContext';
import { ChatContext } from '../../Context/ChatContext';
import './Chat.scss';
import { ChatboxInside, ChatProfile, UserChatSide } from './Components';

function Chat() {
     const { setNewMessage, room } = useContext(ChatContext);
     const { socketRef } = useContext(AppContext);

     useEffect(() => {
          const handleMessageReceived = (newMess) => {
               setNewMessage(newMess);
          }
          socketRef.current?.on("message received", handleMessageReceived);

          return () => {
               socketRef.current?.off("message received", handleMessageReceived);
          }
     }, []);

     return (
          <div className='chat-page'>
               <Row>
                    <Col xs={0} md={8} lg={6} className="chat-side-block">
                         <UserChatSide />
                    </Col>

                    <Col xs={24} md={16} lg={12} style={{ padding: '12px' }} className="chat-inside-block">
                         {room != 0 ? <ChatboxInside /> : <Empty fontSize={5} style={{ backgroundColor: 'rgba(128, 128, 128, 0.153)', borderRadius: '20px', height: '94.5vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }} description='Chọn tin nhắn để bắt đầu trò chuyện' />}
                    </Col>

                    <Col xs={0} md={0} lg={6} className="chat-info">
                         {room != 0 ? <ChatProfile /> : <div />}
                    </Col>
               </Row>
          </div>
     );
}

export default memo(Chat);

