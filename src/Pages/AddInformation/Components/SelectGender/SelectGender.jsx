import classNames from 'classnames';
import { memo, useCallback, useContext } from 'react';
import { AppContext } from '../../../../Context/AppContext';
import female from '../../../../assets/gender/female.jpg';
import male from '../../../../assets/gender/male.jpg';
import './SelectGender.scss';
import { Tooltip } from 'antd';

function SelectGender() {
     const { registerSideInfor, setRegisterSideInfor, userLogin } = useContext(AppContext);

     const handleChange = useCallback((e) => {
          setRegisterSideInfor({ ...registerSideInfor, gender: e.target.id, userID: userLogin._id });
     }, [setRegisterSideInfor, userLogin._id, registerSideInfor]);

     return (
          <div className="select-gender">
               <h1 className="title">
                    GIỚI TÍNH CỦA BẠN
                    {/* {registerSideInfor.gender == '1' ? 'LÀ NAM' : ''}
                    {registerSideInfor.gender == '0' ? 'LÀ NỮ' : ''} */}
               </h1>
               <p className="sub-title">
                    Cung cấp thông tin giới tính giúp tối ưu trải nghiệm người dùng. Bạn có thể chọn 1 trong 2 <br />
                    Lưu ý nhỏ rằng thông tin giới tính không thể thay đổi sau khi cập nhật
               </p>

               <div className="gender-select-block">
                    <div>
                         <Tooltip placement="left" title='nam'>
                              <img
                                   id="1"
                                   src={male}
                                   alt=""
                                   className={classNames("gender-img male", { 'checked': registerSideInfor.gender === '1' })}
                                   onClick={(e) => handleChange(e)}
                              />
                         </Tooltip>
                         <p className='sub-text'>Nam</p>
                    </div>
                    <div className='gender-img-block'>
                         <Tooltip placement="right" title='nữ'>
                              <img
                                   id="0"
                                   src={female}
                                   alt=""
                                   className={classNames("gender-img female", { 'checked': registerSideInfor.gender === '0' })}
                                   onClick={(e) => handleChange(e)}
                              />
                         </Tooltip>
                         <p className='sub-text'>Nữ</p>
                    </div>
               </div>
          </div >
     );
}

export default memo(SelectGender);