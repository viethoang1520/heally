import { memo, useContext} from 'react';
import { ChatContext } from '../../Context/ChatContext';
import './Chat.scss';
import { ChatboxInside, ChatProfile, UserChatSide } from './Components';
import { Col, Empty, Row } from 'antd';

function Chat() {
     const { room } = useContext(ChatContext);
     
     return (
          <div className='chat-page'>
               <Row>
                    <Col xs={24} md={6} className="chat-side-block">
                         <UserChatSide />
                    </Col>
                    <Col xs={24} md={13} style={{ padding: '12px' }} className="chat-inside-block">
                         {room != 0 ? <ChatboxInside /> : <Empty fontSize={5} style={{ backgroundColor: 'rgba(128, 128, 128, 0.153)', borderRadius: '20px', height: '94.5vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }} description='Chọn tin nhắn để bắt đầu trò chuyện' />}
                    </Col>
                    <Col xs={24} md={5} className="chat-info">
                         {room != 0 ? <ChatProfile /> : <div />}
                    </Col>
               </Row>
               <div className='not-sp-noti'>
                    <img src="https://www.shutterstock.com/image-vector/page-not-found-concept-404-600nw-708727921.jpg" alt="" className="not-sp-img" />
               </div>
          </div>
     );
}

export default memo(Chat);

