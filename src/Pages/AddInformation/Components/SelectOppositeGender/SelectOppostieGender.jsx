import classNames from "classnames";
import { memo, useCallback, useContext } from "react";
import female from '../../../../assets/gender/female.jpg';
import gender from '../../../../assets/gender/gender.jpg';
import male from '../../../../assets/gender/male.jpg';
import { AppContext } from "../../../../Context/AppContext";
import './SelectOppositeGender.scss';

function SelectOppositeGender() {
     const { registerSideInfor, setRegisterSideInfor } = useContext(AppContext);

     const handleChange = useCallback((e) => {
          setRegisterSideInfor({ ...registerSideInfor, oppositeGender: e.target.id })
     }, []);

     return (
          <div className="select-opposite-gender">
               <h1 className="title">
                    ĐỐI TƯỢNG BẠN MUỐN NHẮN TIN
                    {registerSideInfor.oppositeGender == '1' ? 'LÀ NAM' : ''}
                    {registerSideInfor.oppositeGender == '0' ? 'LÀ NỮ' : ''}
                    {registerSideInfor.oppositeGender == '3' ? 'LÀ CẢ 2' : ''}
               </h1>
               <p className="sub-title">
                    Thông tin này sẽ giúp bạn dễ dàng tìm được đối tượng để tâm lý hợp với ý của bạn nhất
                    <br /> Bạn có thể chọn linh hoạt giữa Nam, Nữ hoặc cả 2
               </p> 

               <div className="gender-select-block">
                    <div className='gender-img-block'>
                         <img
                              id="1"
                              src={male}
                              alt=""
                              className={classNames("gender-img male", { 'checked': registerSideInfor.oppositeGender === '1' })}
                              onClick={(e) => handleChange(e)}
                         />
                         <p className='sub-text'>Nam</p>
                    </div>

                    <div className='gender-img-block'>
                         <img
                              id="0"
                              src={female}
                              alt=""
                              className={classNames("gender-img female", { 'checked': registerSideInfor.oppositeGender === '0' })}
                              onClick={(e) => handleChange(e)}
                         />
                         <p className='sub-text'>Nữ</p>
                    </div>

                    <div className='gender-img-block'>
                         <img
                              id="3"
                              src={gender}
                              alt=""
                              className={classNames("gender-img gender", { 'checked': registerSideInfor.oppositeGender === '3' })}
                              onClick={(e) => handleChange(e)}
                         />
                         <p className='sub-text'>Cả nam và nữ</p>
                    </div>
               </div >
          </div>
     );
}

export default memo(SelectOppositeGender);