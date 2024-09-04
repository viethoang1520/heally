import propTypes from 'prop-types'
import './WelcomeStep.scss'

function WelcomeStep({ handleNextStep }) {
     return (
          <div className="welcome-step">
               <h1 className='title'>CHỈ CÒN VÀI BƯỚC ĐỂ BẮT ĐẦU SỬ DỤNG</h1>
               <p className='sub-title'>Bổ sung thông tin cá nhân giúp cá nhân hóa và nâng cao trải nghiệm người dùng của bạn</p>
               <p className='sub-title'>Bước này chỉ diễn ra trong lần đăng ký đầu tiên</p>
               <button className='button-start' onClick={handleNextStep}>
                    <span className="label">Bắt đầu</span>
                    <span className="icon">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                    </span>
               </button>
          </div>
     )
}

export default WelcomeStep

WelcomeStep.propTypes = {
     handleNextStep: propTypes.func
}