import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import { Flex, Progress } from 'antd';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import zxcvbn from 'zxcvbn';
import { registerUser } from '../../apis/authentication';
import logo from '../../assets/logo-with-text.png';
import { LoadingVocado } from '../../Components';
import './SignUp.scss';

function SignUp() {
     const navigate = useNavigate()
     const [showLoading, setShowLoading] = useState(false);
     const [errorCode, setErrorCode] = useState({ code: '', msg: '' });
     const [isValidate, setIsValidate] = useState(false);
     const [formData, setFormData] = useState({ username: '', name: '', password: '', confirmPassword: '' });
     const [showPassword, setShowPassword] = useState(false);
     const [checkConfirmPassword, setCheckConfirmPasswrord] = useState(true);
     const testPasswordScore = zxcvbn(formData.password).score;
     const testPasswordProgess = (zxcvbn(formData.password).score * 100 / 4);

     const handleChangeInput = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
     }

     const checkStatusPassword = () => {
          switch (testPasswordScore) {
               case 0:
                    if (formData.password != '') {
                         return { color: 'danger', text: "Mật khẩu rất yếu" }
                    } else {
                         return { color: 'danger', text: "" }
                    }

               case 1:
                    return { color: 'danger', text: "Mật khẩu rất yếu" }
               case 2:
                    return { color: 'warning', text: "Mật khẩu yếu" }
               case 3:
                    return { color: 'warning', text: "Mật khẩu trung bình" }
               case 4:
                    return { color: 'success', text: "Mật khẩu mạnh" }
               default:
                    return { color: 'none', text: "" }
          }
     }

     const handleSignUp = async (e) => {
          e.preventDefault();
          setShowLoading(true);
          if (isValidate) {
               const {data} = await registerUser(formData);
               console.log(data);
               if (data.error_code == 0) {
                    toast.success('Đăng ký tài khoản thành công!');
                    navigate('/login');
               } else {
                    setErrorCode({ code: data.error_code, msg: data.msg });
                    console.log(errorCode);
               }
          }
          setShowLoading(false);
     }

     const handleShowPassword = () => {
          setShowPassword(!showPassword);
     }

     useEffect(() => {
          if (formData.confirmPassword !== '') {
               if (formData.confirmPassword === formData.password) {
                    setCheckConfirmPasswrord(true);
               } else {
                    setCheckConfirmPasswrord(false);
               }
          } else {
               setCheckConfirmPasswrord(true);
          }
     }, [formData]);

     useEffect(() => {
          if (formData.username !== ""
               && formData.name !== ""
               && formData.password !== ""
               && formData.confirmPassword !== ""
               && checkConfirmPassword
               && testPasswordProgess == 100
          ) {
               setIsValidate(true);
          } else {
               setIsValidate(false);
          }
     }, [formData, checkConfirmPassword, testPasswordProgess]);

     return (
          <div className="sign-up-page gradient-background">
               {showLoading && <LoadingVocado />}
               <form className='sign-up-form' onSubmit={handleSignUp}>
                    <img src={logo} className='logo' alt="" />
                    <h1 className='title'>Tạo tài khoản mới</h1>

                    <div className={classNames('input-block', { 'incorrect': errorCode.code == 1 })} >
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

                         {errorCode.code == 1
                              ? <span className='incorrect-msg'>*Tên đăng nhập đã tồn tại</span>
                              : ""
                         }
                    </div>

                    <div className='input-block'>
                         <label htmlFor="name" className='label name'>Họ và tên</label>
                         <input
                              type="text"
                              className="input email"
                              id='name'
                              value={formData.fullname}
                              onChange={(e) => handleChangeInput(e)}
                              name='name'
                              required
                         />
                         {/* <span className='incorrect-msg'>*Họ và tên không hợp lệ</span> */}
                    </div>

                    <div className='input-block'>
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
                         {/* <span className='incorrect-msg'>*Mật khẩu có độ dài tối thiểu 6 ký tự</span> */}
                         <Icon
                              icon="mdi:eye"
                              className={classNames('icon', { 'hide': !showPassword })}
                              onClick={handleShowPassword}
                         />

                         <Icon
                              icon="mdi:eye-off"
                              className={classNames('icon', { 'hide': showPassword })}
                              onClick={handleShowPassword}
                         />

                         {/* <ProgressBar
                              now={testPasswordProgess}
                              variant={checkStatusPassword().color}
                              style={{ width: "80%", margin: "0 auto" }}
                         /> */}

                         {/* <Stack spacing={2} sx={{ display: "flex", alignItems: "center" }}>
                              <LinearProgress sx={{width: "80%" }} variant="determinate" value={testPasswordProgess} />
                         </Stack> */}

                         <Flex gap="small" vertical>
                              <Progress percent={testPasswordProgess} status={testPasswordProgess < 40 ? "exception" : ""} showInfo={false} style={{ width: "81%", alignSelf: "center" }} />
                         </Flex>


                         <span className='text-desc-pass'>{checkStatusPassword().text}</span>
                    </div>

                    <div className='input-block'>
                         <label htmlFor="confirm" className='label fullname'>Nhập lại mật khẩu</label>
                         <input
                              type={showPassword ? "text" : "password"}
                              className="input confirm"
                              id='confirm'
                              value={formData.confirmPassword}
                              onChange={(e) => handleChangeInput(e)}
                              name='confirmPassword'
                              required
                         />
                         {/* <span className='incorrect-msg'>*Mật khẩu xác nhận không trùng khớp</span> */}
                         <Icon icon="dashicons:no" className={classNames('icon', 'confirm-wrong', { 'hide': checkConfirmPassword })} />
                    </div>

                    <button className={classNames('button-sign-up', { 'disable': !isValidate })}>Tạo tài khoản</button>

                    <p className='login-text'>
                         Đã có tài khoản? <Link className='login-link' to='/login'>Đăng nhập</Link>
                    </p>
               </form>
          </div>
     );
}
export default SignUp;