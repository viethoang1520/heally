import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import { Link } from 'react-router-dom';
import { DefaultAvatar } from '../../../../assets/avatar';
import './ChatProfile.scss';
import { memo, useContext, useState } from 'react';
import { ChatContext } from '../../../../Context/ChatContext';
import { Flex, Modal, Rate, Typography, Input, Button } from 'antd';
import { ratingUser } from '../../../../apis/chat';
import toast from 'react-hot-toast';

function ChatProfile() {
     const { oppositeUser } = useContext(ChatContext);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [star, setStar] = useState();
     const [isLoading, setIsLoading] = useState(false);

     const handleOk = () => {
          setIsModalOpen(false);
     };
     const handleCancel = () => {
          setIsModalOpen(false);
     };

     const handleRating = async () => {
          setIsLoading(true);
          if (star) {
               const { data } = await ratingUser(oppositeUser.userId, star);
               if (data.error_code == 0) {
                    toast.success('Cảm ơn bạn đã đánh giá');
                    setIsModalOpen(false);
               } else {
                    toast.error(data.message);
               }
          } else {
               toast.error("Vui lòng chọn ít nhất 1 sao");
          }
          setIsLoading(false);
     }

     const desc = ['rất tệ', 'tệ', 'bình thường', 'tốt', 'tuyệt vời bạn êii'];

     return (
          <div className="chat-profile">
               <Modal title="Đánh giá người dùng" footer={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Typography.Text type="secondary">Bạn cảm thấy người dùng này trò chuyện thế nào?</Typography.Text>
                    <Flex justify='center' style={{ margin: '40px 0' }}>
                         <Rate style={{ fontSize: '3rem' }} tooltips={desc} onChange={setStar} value={star} />
                    </Flex>
                    <Input.TextArea showCount maxLength={100} placeholder="Thêm bình luận ... (Tối đa 100 ký tự)" style={{ height: 90, resize: 'none', marginBottom: '40px' }} />
                    <Flex justify='flex-end'>
                         <Button loading={isLoading} onClick={handleRating} style={{ backgroundColor: '#adea85', color: "#fff" }} type="primary">Đánh giá</Button>
                    </Flex>
               </Modal>

               <div className="info-block">
                    <img src={oppositeUser.avatarLink || DefaultAvatar}
                         alt=""
                         className="avatar"
                    />
                    <Link to='/profile' className='name'>{oppositeUser.name}</Link>
               </div>

               <div style={{ textAlign: "center" }}>
                    {oppositeUser.rating == 0
                         ? "Chưa có đánh giá"
                         : <Rate disabled defaultValue={oppositeUser.rating} allowHalf />
                    }
               </div>

               <div className="button-block">
                    <div className='button ratting' onClick={() => setIsModalOpen(true)}>
                         <Icon icon="tabler:star" className='icon' />
                         <p className='text'>Đánh giá</p>
                    </div>

                    <div className='button view-profile'>
                         <Icon icon="iconamoon:profile-circle" className='icon' />
                         <p className='text'>Xem thông tin</p>
                    </div>
               </div>
          </div>
     );
}

export default memo(ChatProfile);