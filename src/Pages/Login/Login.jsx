import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import classNames from 'classnames';
import { memo, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../apis/authentication';
import Logo from '../../assets/logo-with-text.png';
import { LoadingVocado } from '../../Components';
import { AppContext } from '../../Context/AppContext';
import './Login.scss';

function Login() {
     const navigate = useNavigate();
     const [showPassword, setShowPassword] = useState(false);
     const [showLoading, setShowLoading] = useState(false);
     const [loginError, setLoginError] = useState({ code: '', msg: '' });
     const [formData, setFormData] = useState({ username: '', password: '' });
     const [isValidate, setIsValidate] = useState(false);
     const { setUserLogin } = useContext(AppContext);

     const handleChangeInput = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
     }

     const handleShowPassword = () => {
          setShowPassword(!showPassword);
     }

     const handleLogin = async (e) => {
          e.preventDefault();
          setShowLoading(true);
          const { data } = await loginUser(formData);
          if (data.error_code === 0) {
               if (data.user.status === 0) {
                    toast.success(`Đăng nhập thành công! Vui lòng hoàn thành thông tin để tiếp tục`);
                    setUserLogin(data.user)
                    sessionStorage.setItem('userLogin', JSON.stringify(data.user));
                    navigate('/addinformation')
               } else {
                    sessionStorage.setItem('userLogin', JSON.stringify(data.user));
                    // toast.success(`Đăng nhập thành công!`);
                    toast.success(`Chào mừng ${data.user.full_name}`);
                    setUserLogin(data.user);
                    navigate('/chat');
               }

          } else {
               setLoginError({ code: data.error_code, msg: data.message });
               setFormData({ ...formData, password: '' });
          }
          setShowLoading(false);
     }

     useEffect(() => {
          if (loginError.code === 3) {
               toast.error(loginError.msg);
          }

     }, [loginError])

     useEffect(() => {
          if (formData.password !== '' && formData.username !== '') {
               setIsValidate(true);
          } else {
               setIsValidate(false);
          }
     }, [formData]);

     return (
          <div className="login-page gradient-background">
               {showLoading && <LoadingVocado />}
               <form className='login-form' onSubmit={handleLogin}>
                    <img src={Logo} className='logo' alt="HEALLY LOGO" />
                    <h1 className='title'>Chào mừng trở lại</h1>
                    <div className={classNames('input-block', { 'incorrect': loginError.code == 1 })}>
                         <label htmlFor="username" className='label username'>Tên đăng nhập</label>
                         <input
                              type="text"
                              className="input username"
                              id='username'
                              value={formData.username}
                              name='username'
                              onChange={(e) => handleChangeInput(e)}
                              required
                         />
                    </div>

                    <div className={classNames('input-block', { 'incorrect': loginError.code == 1 }, { 'incorrect': loginError.code == 2 })}>
                         <label htmlFor="password" className='label fullname'>Mật khẩu</label>
                         <input
                              type={showPassword ? "text" : "password"}
                              className="input password"
                              id='password'
                              value={formData.password}
                              name='password'
                              onChange={(e) => handleChangeInput(e)}
                              required
                         />

                         <span className='incorrect-msg'>{loginError.msg}</span>
                         <Icon
                              icon="mdi:eye"
                              className={classNames('icon', { 'hide': !showPassword })}
                              onClick={handleShowPassword}
                              title='Hiện mật khẩu'
                         />
                         <Icon
                              icon="mdi:eye-off"
                              className={classNames('icon', { 'hide': showPassword })}
                              onClick={handleShowPassword}
                              title='Ẩn mật khẩu'
                         />
                    </div>

                    <button className={classNames('button-login', { 'disable': !isValidate })}>Đăng nhập</button>

                    <p className='sign-up-text'>
                         Chưa có tài khoản? <Link className='sign-up-link' to='/signup'>Đăng ký</Link>
                    </p>
               </form>
          </div>
     );
}
export default memo(Login);