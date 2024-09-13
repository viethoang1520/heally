import classNames from 'classnames';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { addInformation, getUser } from '../../apis/authentication';
import StepProcess from '../../Components/StepProcess';
import { AppContext } from '../../Context/AppContext';
import './AddInformation.scss';
import { SelectAvatar, SelectGender, SelectNickname, SelectOppostieGender, WelcomeStep } from './Components';

function AddInformation() {
     const [step, setStep] = useState(-1);
     const { registerSideInfor, userLogin, setUserLogin } = useContext(AppContext);
     const navigate = useNavigate();
     const [isValidate, setIsValidate] = useState(true);
     const LAST_STEP = useRef(3);

     const handleSubmit = async () => {
          if (isValidate) {
               const { data } = await addInformation(registerSideInfor);
               toast.success(data.message);
               if (data.error_code == 0) {
                    const { data } = await getUser(userLogin._id);
                    sessionStorage.setItem('userLogin', JSON.stringify(data.message));
                    setUserLogin(data.message);
                    navigate('/chat');
               } else {
                    toast.error(data.message);
               }
          } else {
               toast.error('Vui lòng hoàn thành tất cả các mục để tiếp tục');
          }
     }

     let StepPage = () => {
          switch (step) {
               case 0: return <SelectAvatar />
               case 1: return <SelectGender />
               case 2: return <SelectOppostieGender />
               case 3: return <SelectNickname />
          }
     }


     const handleNextStep = () => {
          if (step < LAST_STEP.current && isValidate) {
               setStep(step + 1);
          }
          if (!isValidate) {
               toast.error('Vui lòng hoàn thành trước khi sang mục tiếp theo');
          }
     }

     useEffect(() => {
          if (step == 0 && registerSideInfor.avatar === '') {
               setIsValidate(false);
          } else if (step === 1 && registerSideInfor.gender === '') {
               setIsValidate(false);
          } else if (step === 2 && registerSideInfor.oppositeGender === '') {
               setIsValidate(false);
          } else if (step === 3 && registerSideInfor.nickname === '') {
               setIsValidate(false);
          } else {
               setIsValidate(true);
          }
     }, [registerSideInfor, step]);

     return (
          <div className='add-information overlay'>
               <div className='add-information-modal'>
                    {StepPage()}
                    {step == -1
                         ? <WelcomeStep handleNextStep={handleNextStep} />
                         : <>
                              <div className='btn-block'>
                                   {step == 3 && <button className={classNames('btn-next-step', { 'disable': !isValidate })} onClick={handleSubmit}>Hoàn thành</button>}

                                   {step < 3
                                        && <button className={classNames('btn-next-step', { 'disable': !isValidate })} onClick={handleNextStep}>
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
                                             </svg>
                                             <div className="text">Bước tiếp theo</div>
                                        </button>
                                   }
                              </div>

                              <div className='progress-bar-step'>
                                   <StepProcess activeStep={step} />
                              </div>
                         </>
                    }
               </div>
          </div>
     )
}

export default AddInformation