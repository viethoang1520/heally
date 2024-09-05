import { Icon } from '@iconify-icon/react';
import classNames from "classnames/bind";
import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import mainLogo from '../../assets/logo-heally.png';
import { Modal } from 'antd';
import { memo, useState } from 'react';
import { toast } from 'sonner';
// import toast from 'react-hot-toast';


function Header() {
     
     const [isModalOpen, setIsModalOpen] = useState(false);

     const handleClickTest = () => {
          // toaster.danger('Dev mode test');
          toast.success('Successfully toasted!')
     
     }

     const showModal = () => {
          setIsModalOpen(true);
     };
     const handleOk = () => {
          setIsModalOpen(false);
     };
     const handleCancel = () => {
          setIsModalOpen(false);
     };

     return (
          <header className="header">

               <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
               </Modal>
               <Link to='/' className="link-logo">
                    <img className="logo-img" src={mainLogo} alt="" />
               </Link>

               <ul className='navbar-list'>
                    <li className='navbar-item'>
                         <NavLink
                              to='/addfriend'
                              className={classNames(
                                   'navbar-item-link',
                                   ({ isActive }) => (isActive ? 'active' : '')
                              )}>
                              <Icon icon="fluent:emoji-add-20-regular" className='icon' />
                         </NavLink>
                    </li>

                    <li className='navbar-item'>
                         <NavLink
                              to='/chat'
                              className={classNames(
                                   'navbar-item-link',
                                   ({ isActive }) => (isActive ? 'active' : '')
                              )}>
                              <Icon icon="ep:chat-dot-round" className='icon' />
                         </NavLink>
                    </li>

                    <li className='navbar-item'>
                         <NavLink to='/vocado'
                              className={classNames(
                                   'navbar-item-link',
                                   ({ isActive }) => (isActive ? 'active' : '')
                              )}>
                              <Icon icon="ph:avocado" className='icon' />
                         </NavLink>
                    </li>

                    <li className='navbar-item'>
                         <NavLink
                              to='/profile'
                              className={classNames(
                                   'navbar-item-link',
                                   ({ isActive }) => (isActive ? 'active' : '')
                              )}>
                              <Icon icon="iconamoon:profile-light" className='icon' />
                         </NavLink>
                    </li>

                    <li className='navbar-item'>
                         <NavLink
                              to='/friend'
                              className={classNames(
                                   'navbar-item-link',
                                   ({ isActive }) => (isActive ? 'active' : '')
                              )}>
                              <Icon icon="heroicons:user-group" className='icon' />
                         </NavLink>
                    </li>

                    <li className='navbar-item'>
                         <NavLink
                              to='/notification'
                              className={classNames(
                                   'navbar-item-link',
                                   ({ isActive }) => (isActive ? 'active' : '')
                              )}>
                              <Icon icon="hugeicons:notification-01" className="icon" />
                         </NavLink>
                    </li>
               </ul>

               <div className="other-btn">
                    <button onClick={handleClickTest}>TEST</button>
               </div>
          </header>
     );
}

export default memo(Header);