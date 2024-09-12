import { memo, useContext, useEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { toast } from 'sonner';
import { ButtonBlink } from '../../Components';
import AvatarRipple from '../../Components/AvatarRipple/AvatarRipple';
import { AppContext } from '../../Context/AppContext';
import './Avocado.scss';

function Avocado() {
     const { userLogin, socketRef, isSocketConnect } = useContext(AppContext);
     const [isFinding, setIsFinding] = useState(false);
     const { seconds, minutes, start, pause, reset } = useStopwatch({ autoStart: false });

     const handleClick = () => {
          if (isFinding) {
               setIsFinding(false);
               socketRef.current.emit('stop finding', userLogin);
               console.log('Stop finding');
               pause();
          } else {
               setIsFinding(true);
               console.log('Finding....');
               reset();
               start();
               setTimeout(() => {
                    socketRef.current.emit('finding', userLogin);
               }, 3500);
          }
     };

     useEffect(() => {
          if (isSocketConnect) {
               const handleMatched = (matched) => {
                    setIsFinding(false);
                    toast.success(`Đã tìm thấy: ${matched.user.nickname} (${seconds}s)`);
                    pause();
               };
               socketRef.current?.on('matched', handleMatched);
               return () => socketRef.current?.off('matched', handleMatched);
          }
     }, [isSocketConnect]);

     return (
          <div className="avocado">
               <div className='self-block'>
                    <AvatarRipple
                         isFinding={isFinding}
                         linkAvatar={userLogin.avatar.link}
                    />
                    <div className='btn-block' onClick={handleClick}>
                         <ButtonBlink>
                              {isFinding
                                   ? `${minutes < 10 ? '0' + minutes : minutes} : ${seconds < 10 ? '0' + seconds : seconds}`
                                   : 'Tìm'}
                         </ButtonBlink>
                    </div>
               </div>
          </div>
     );
}

export default memo(Avocado);