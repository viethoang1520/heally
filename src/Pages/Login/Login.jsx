import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isValidUser, loginUser } from '../../apis/authentication';
import Logo from '../../assets/logo-with-text.png';
import { LoadingVocado } from '../../Components';
import { AppContext } from '../../Context/AppContext';
import './Login.scss';
import { toast } from 'sonner';
import { Row, Col, Flex, Tooltip } from 'antd';
// import AvocadoHiPhoto from '../../assets/avocado-sayhi.png';
import avocadoTyping from '../../assets/avocado-typing.jpg';
import { TypeAnimation } from 'react-type-animation';

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

     useEffect(() => {
          if (formData.password !== '' && formData.username !== '') {
               setIsValidate(true);
          } else {
               setIsValidate(false);
          }
     }, [formData]);

     const checkUserStatus = async (token) => {
          localStorage.setItem('token', token);
          const { data } = await isValidUser();
          sessionStorage.setItem('userLogin', JSON.stringify(data.user));
          setUserLogin(data.user);
          if (data.user.status === 0) {
               toast.success(`Đăng nhập thành công! Vui lòng hoàn thành thông tin để tiếp tục`);
               navigate('/addinformation');
          } else {
               toast.success(`Chào mừng ${data.user.full_name}`);
               navigate('/chat');
          }
     }

     const handleLogin = async (e) => {
          e.preventDefault();
          if (isValidate) {
               setShowLoading(true);
               const { data } = await loginUser(formData);
               if (data.error_code === 0) {
                    checkUserStatus(data.token);
               } else if (data.error_code === 3) {
                    toast.error(loginError.msg);
               } else {
                    setLoginError({ code: data.error_code, msg: data.message });
                    setFormData({ ...formData, password: '' });
               }
               setShowLoading(false);
          }
     }

     const handleGoogleLogin = () => {
          setShowLoading(true);
          window.open('http://localhost:3000/auth/google', '_self');
     }

     const handleFacebookLogin = () => {
          setShowLoading(true);
          window.open('http://localhost:3000/auth/facebook', '_self');
     }

     useEffect(() => {
          const params = new URLSearchParams(window.location.search);
          const token = params.get('token');
          if (token) {
               localStorage.setItem('token', token);
          }
          setShowLoading(false);
     }, []);

     useEffect(() => {
          const token = localStorage.getItem('token');
          const fetchUserData = async () => {
               setShowLoading(true);
               const { data } = await isValidUser();
               const res = await isValidUser();
               console.log(res);
               if (data.error_code === 0) {
                    checkUserStatus(data.token);
               } else {
                    toast.error('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!');
               }
               setShowLoading(false);
          }
          if (token) {
               fetchUserData();
          }
     }, []);

     return (
          <div className="login-page">
               <img src={Logo} className='logo-top' alt="HEALLY LOGO" />
               <Row align='center' className="login-block">
                    {showLoading && <LoadingVocado />}
                    <Col xs={24} md={13}>
                         <form className='login-form' onSubmit={handleLogin}>
                              {/* <img src={Logo} className='logo' alt="HEALLY LOGO" /> */}
                              <h1 className='title'>Đăng nhập</h1>
                              <div className={classNames('input-block', { 'incorrect': loginError.code == 1 })}>
                                   <label htmlFor="username" className='label username'>Tên đăng nhập</label>
                                   <input
                                        type="text"
                                        className="input username"
                                        id='username'
                                        value={formData.username}
                                        name='username'
                                        onChange={(e) => handleChangeInput(e)}
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
                                   />

                                   <span className='incorrect-msg'>{loginError.msg}</span>
                                   <Tooltip title='Hiện mật khẩu'>
                                        <Icon
                                             icon="mdi:eye"
                                             className={classNames('icon', { 'hide': !showPassword })}
                                             onClick={handleShowPassword}
                                        />
                                   </Tooltip>
                                   <Tooltip title='Ẩn mật khẩu'>
                                        <Icon
                                             icon="mdi:eye-off"
                                             className={classNames('icon', { 'hide': showPassword })}
                                             onClick={handleShowPassword}
                                        />
                                   </Tooltip>
                              </div>

                              <button className={classNames('button-login', { 'disable': !isValidate })}>Đăng nhập</button>

                              <p className='text-or'>hoặc đăng nhập với</p>
                              <div className="social-login-block">
                                   <button onClick={handleFacebookLogin} className="button facebook">
                                        <Icon className='icon' icon="logos:facebook" />
                                   </button>

                                   <button onClick={handleGoogleLogin} className="button google">
                                        <Icon className='icon google' icon="logos:google-icon" />
                                   </button>
                              </div>

                              <p className='login-text'>
                                   Chưa có tài khoản? <Link className='login-link' to='/signup'>Đăng ký</Link>
                              </p>
                         </form>
                    </Col>

                    <Col xs={0} md={10} className='side-information' >
                         <Flex justify='center' align='center' vertical style={{ width: '100%', height: '100%' }}>
                              <TypeAnimation
                                   sequence={[
                                        'Xin chào!', 3000, 'Hello!',
                                        3000, 'こんにちは', 3000, 'Bonjour!', 3000, '안녕하세요', 3000,
                                        'Olá!', 3000, 'Hallo!', 3000, '你好', 3000, 'สวัสดี', 3000
                                   ]}
                                   wrapper="span"
                                   speed={20}
                                   style={{ fontSize: '3em', fontWeight: '600', opacity: '60%', display: 'inline-block', fontFamily: "Playwrite CU, cursive" }}
                                   repeat={Infinity}
                              />
                              {/* <img src={Logo} className='logo' alt="HEALLY LOGO" /> */}
                              <Tooltip title='Heally xin chào bạn ^^'><img className='avocado-hi' src={avocadoTyping} alt="" /></Tooltip>
                         </Flex>
                    </Col>
               </Row>
          </div>
     );
}

export default Login;