import { Icon } from '@iconify-icon/react';
import classNames from "classnames/bind";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.scss';
import mainLogo from '../../assets/logo-heally.png';
import { memo, useCallback, useContext, useState } from 'react';
import { AppContext } from '../../Context/AppContext';
import { toast } from 'sonner';
import { isValidUser } from '../../apis/authentication';
// import { isValidUser } from '../../apis/authentication';

function Header() {
     const navigate = useNavigate();
     const { setUserLogin } = useContext(AppContext);
     const [isSpam, setIsSpam] = useState(false);

     const handleClickTest = useCallback(() => {
          toast.success(`Đăng xuất thành công`);
          navigate('/login');
          localStorage.removeItem('token');
          sessionStorage.removeItem('userLogin');
          setUserLogin();
     }, []);

     const handleSpam = async () => {
          setIsSpam(true);
          while (isSpam) {
               const res = await isValidUser();
               console.log(res);
          }
     }

     return (
          <header className="header">
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
                         <NavLink to='/avocado'
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
                    <button onClick={handleClickTest}>LOG</button>
               </div>

               <div className="other-btn">
                    <button onClick={handleSpam}>SPAM</button>
               </div>
          </header>
     );
}

export default memo(Header);