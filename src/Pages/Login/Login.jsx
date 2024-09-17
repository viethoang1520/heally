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
import { Row, Col, Flex } from 'antd';
import AvocadoHiPhoto from '../../assets/avocado-sayhi.png';
import { TypeAnimation } from 'react-type-animation';

function Login() {
     const navigate = useNavigate();
     const [showPassword, setShowPassword] = useState(false);
     const [showLoading, setShowLoading] = useState(false);
     const [loginError, setLoginError] = useState({ code: '', msg: '' });
     const [formData, setFormData] = useState({ username: '', password: '' });
     const [isValidate, setIsValidate] = useState(false);
     const { setUserLogin } = useContext(AppContext);
     const token = localStorage.getItem('token');

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
               localStorage.setItem('token', JSON.stringify(data.token));
               const res = await isValidUser();
               sessionStorage.setItem('userLogin', JSON.stringify(res.data.user));
               setUserLogin(res.data.user);
               if (res.data.user.status === 0) {
                    toast.success(`Đăng nhập thành công! Vui lòng hoàn thành thông tin để tiếp tục`);
                    navigate('/addinformation');
               } else {
                    toast.success(`Chào mừng ${res.data.user.full_name}`);
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
     }, [loginError]);

     useEffect(() => {
          if (formData.password !== '' && formData.username !== '') {
               setIsValidate(true);
          } else {
               setIsValidate(false);
          }
     }, [formData]);

     useEffect(() => {
          const fetchUserData = async () => {
               setShowLoading(true);
               const { data } = await isValidUser();
               console.log(data);
               if (data.error_code === 0) {
                    localStorage.setItem('token', JSON.stringify(data.token));
                    if (data.user.status === 0) {
                         toast.info(`Vui lòng hoàn thành thông tin để tiếp tục`);
                         setUserLogin(data.user);
                         sessionStorage.setItem('userLogin', JSON.stringify(data.user));
                         navigate('/addinformation');
                    } else {
                         sessionStorage.setItem('userLogin', JSON.stringify(data.user));
                         setUserLogin(data.user);
                         toast.success(`Chào mừng ${data.user.full_name}`);
                         navigate('/chat');
                    }
               } else {
                    toast.error('Vui lòng đăng nhập lại để tiếp tục');
               }
               setShowLoading(false);
          }
          if (JSON.parse(token)) {
               fetchUserData();
          }
     }, [token]);

     return (
          <div className="login-page">
               <Row align='center' className="login-block">
                    {showLoading && <LoadingVocado />}
                    <Col xs={24} md={12}>
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
                    </Col>

                    <Col xs={0} md={12} className='side-information' >
                         <Flex justify='center' align='center' vertical style={{ width: '100%', height: '100%' }}>
                              <TypeAnimation
                                   sequence={[
                                        'Heally xin chào!', 2500, 'Hello!',
                                        2500, 'こんにちは!', 2500, 'Bonjour!', 2500, '안녕하세요!', 2500,
                                        'Olá!', 2500, 'Hallo!', 2500, '你好!', 2500, 'สวัสดี!', 2500
                                   ]}
                                   wrapper="span"
                                   speed={30}
                                   style={{ fontSize: '3em', fontWeight: '600', opacity: '70%', display: 'inline-block' }}
                                   repeat={Infinity}
                              />
                              <img className='avocado-hi' src={AvocadoHiPhoto} alt="" />
                         </Flex>
                    </Col>
               </Row>
          </div>
     );
}

export default Login;