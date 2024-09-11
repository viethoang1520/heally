import { useContext, useEffect, useState } from 'react';
import { ButtonBlink } from '../../Components';
import AvatarRipple from '../../Components/AvatarRipple/AvatarRipple';
import './Avocado.scss'
import { AppContext } from '../../Context/AppContext';
import { toast } from 'sonner';

function Avocado() {
     const { userLogin, socketRef } = useContext(AppContext);

     const [isFinding, setIsFinding] = useState(false);

     console.log(userLogin);

     const handleClick = () => {
          setIsFinding(true);
          console.log('Finding....');
          socketRef.current.emit('find', userLogin);
     }

     useEffect(() => {
          socketRef.current.on('matched', (obj) => {
               console.log('Matched');
               console.log(obj);
               setIsFinding(false);
               toast.success('Đã tìm thấy')
          })
     }, [socketRef]);

     return (
          <div className="avocado">
               <AvatarRipple
                    isFinding={isFinding}
                    linkAvatar={userLogin.avatar.link}
               />
               <div className='btn-block' onClick={handleClick}><ButtonBlink>Tìm</ButtonBlink></div>
          </div>
     );
}

export default Avocado;