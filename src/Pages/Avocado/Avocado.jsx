import { memo, useContext, useEffect, useRef, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { toast } from 'sonner';
import { ButtonBlink } from '../../Components';
import AvatarRipple from '../../Components/AvatarRipple/AvatarRipple';
import { AppContext } from '../../Context/AppContext';
import './Avocado.scss';

function Avocado() {
     const { userLogin, socketRef, isSocketConnect } = useContext(AppContext);
     const [isFinding, setIsFinding] = useState(false);
     const [flagFirstTime, setFlagFirstTime] = useState(false);
     const { seconds, minutes, start, pause, reset } = useStopwatch({ autoStart: false });
     let timeRef = useRef(null);

     const handleClick = () => {
          if (isFinding) {
               stopFinding();
          } else {
               startFinding();
          }
     }

     const startFinding = () => {
          setIsFinding(true);
          setFlagFirstTime(true);
          start();
          timeRef.current = setTimeout(() => {
               socketRef.current.emit('finding', userLogin);
          }, 2500);
     };

     const stopFinding = () => {
          setIsFinding(false);
          socketRef.current.emit('stop finding', userLogin);
          toast.info('Đã hủy tìm kiếm');
          if (timeRef.current) {
               clearTimeout(timeRef.current);
               timeRef.current = null;
          }
          pause();
          reset();
     };

     useEffect(() => {
          if (isSocketConnect) {
               const handleMatched = (matched) => {
                    toast.success(`Đã tìm thấy: ${matched.user.nickname} (${minutes == 0 ? seconds : (seconds + (minutes * 60))}s)`);
                    setIsFinding(false);
                    pause();
                    reset();
               };
               socketRef.current?.on('matched', handleMatched);
               return () => socketRef.current?.off('matched', handleMatched);
          }
     }, [isSocketConnect, seconds, minutes]);

     useEffect(() => {
          return () => {
               if (isFinding) {
                    stopFinding();
                    toast.error('Tìm kiếm sẽ bị hủy nếu bạn rời đi');
               }
          }
     }, [flagFirstTime]);

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