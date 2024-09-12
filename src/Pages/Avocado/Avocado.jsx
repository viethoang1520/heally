import { memo, useContext, useEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { toast } from 'sonner';
import { ButtonBlink } from '../../Components';
import AvatarRipple from '../../Components/AvatarRipple/AvatarRipple';
import { AppContext } from '../../Context/AppContext';
import './Avocado.scss';

function Avocado() {
     const { userLogin, socketRef } = useContext(AppContext);
     const [isFinding, setIsFinding] = useState(false);
     const { seconds, minutes, start, pause } = useStopwatch({ autoStart: false });

     const handleClick = () => {
          if (isFinding) {
               setIsFinding(false);
               socketRef.current.emit('stop find', userLogin);
               console.log('Stop finding');
               pause();
          } else {
               setIsFinding(true);
               console.log('Finding....');
               socketRef.current.emit('find', userLogin);
               start();
          }
     };

     useEffect(() => {
          const handleMatched = (matched) => {
               console.log('Matched', matched);
               setIsFinding(false);
               pause();
               toast.success(`Đã tìm thấy: ${matched.user.nickname}`);
          };
          socketRef.current?.on('matched', handleMatched);
          return () => socketRef.current?.off('matched', handleMatched);
     }, [socketRef]);

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