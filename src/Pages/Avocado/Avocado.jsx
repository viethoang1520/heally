import { useContext, useEffect, useState } from 'react';
import { ButtonBlink } from '../../Components';
import AvatarRipple from '../../Components/AvatarRipple/AvatarRipple';
import './Avocado.scss'
import { AppContext } from '../../Context/AppContext';
import { toast } from 'sonner';
import { useStopwatch } from 'react-timer-hook';

function Avocado() {
     const { userLogin, socketRef } = useContext(AppContext);
     const [isFinding, setIsFinding] = useState(false);
     const { seconds, minutes, start, pause } = useStopwatch({ autoStart: true });

     const handleClick = () => {
          if (!isFinding) {
               setIsFinding(true);
               console.log('Finding....');
               socketRef.current.emit('find', userLogin);
               start();
          } else {
               setIsFinding(false);
               socketRef.current.emit('stop find', userLogin);
               console.log('Stop finding');
          }
     }

     useEffect(() => {
          socketRef.current.on('matched', (obj) => {
               console.log('Matched');
               console.log(obj);
               setIsFinding(false);
               pause();
               toast.success('Đã tìm thấy');
          })
     }, [socketRef]);

     return (
          <div className="avocado">
               <div className='self-block'>
                    <AvatarRipple
                         isFinding={isFinding}
                         linkAvatar={userLogin.avatar.link}
                    />
                    <div className='btn-block' onClick={handleClick}><ButtonBlink>{isFinding ? `${minutes < 10 ? '0' + minutes : minutes} : ${seconds < 10 ? '0' + seconds : seconds}` : 'Tìm'}</ButtonBlink></div>
               </div>
          </div>
     );
}

export default Avocado;