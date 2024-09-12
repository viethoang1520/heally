import { Icon } from '@iconify-icon/react';
import classNames from "classnames/bind";
import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import mainLogo from '../../assets/logo-heally.png';
import { memo, useCallback, useContext } from 'react';
import { AppContext } from '../../Context/AppContext';

function Header() {

     const { theme, setTheme } = useContext(AppContext);

     const handleClickTest = useCallback(() => {
          if (theme === 'light-theme') {
               setTheme('dark-theme');
          } else {
               setTheme('light-theme');
          }
     }, [setTheme, theme]);

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
                    <button onClick={handleClickTest}>TEST</button>
               </div>
          </header>
     );
}

export default memo(Header);