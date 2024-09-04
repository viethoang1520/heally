import { memo, useCallback, useContext } from "react"
import { AppContext } from "../../../../Context/AppContext"
import './SelectNickname.scss'

function SelectNickname() {
     const { registerSideInfor, setRegisterSideInfor } = useContext(AppContext)

     const handleChange = useCallback((e) => {
          setRegisterSideInfor({ ...registerSideInfor, nickname: e.target.value })
     }, []);
     
     return (
          <div className="select-nickname">
               <h1 className="title">NICKNAME CỦA BẠN LÀ</h1>
               <p className="sub-title">
                    Đặt nickname thật &quot;phong cách&quot; giúp cá nhân hóa sở thích, khiến bạn &quot;cool&quot; hơn trong mắt những người khác
               </p>
               <div className="input-block">
                    <input
                         className="input-nickname"
                         value={registerSideInfor.nickname}
                         type="text"
                         onChange={(e) => handleChange(e)}
                    />
               </div>
          </div>
     );
}

export default memo(SelectNickname);