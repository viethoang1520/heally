// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import propTypes from 'prop-types';

// const steps = ['Ảnh đại diện', 'Giới tính của bạn', 'Giới tính đối phương', 'Nickname'];

// export default function HorizontalLinearStepper({ activeStep }) {
//      // const [activeStep, setActiveStep] = React.useState(0);

//      // const isStepOptional = (step) => {
//      //      return step === 1;
//      // };

//      return (
//           <Box sx={{ width: '100%' }}>
//                <Stepper activeStep={activeStep} >
//                     {steps.map((label) => {
//                          const stepProps = {};
//                          const labelProps = {};
//                          // if (isStepOptional(index)) {
//                          //      labelProps.optional = (
//                          //           <Typography variant="caption">Optional</Typography>
//                          //      );
//                          // }
//                          return (
//                               <Step key={label} {...stepProps}>
//                                    <StepLabel
//                                         StepIconProps={{ sx: { fontSize: '3rem' } }}
//                                         sx={{ '& .MuiStepLabel-label': { fontSize: '1.7rem' } }}
//                                         {...labelProps}>
//                                         {label}
//                                    </StepLabel>
//                               </Step>
//                          );
//                     })}
//                </Stepper>
//           </Box>
//      );
// }

import { Steps } from 'antd';
import propTypes from 'prop-types';

const steps = [
     {
          title: 'Avatar',
     },
     {
          title: 'Giới tính của bạn',
     },
     {
          title: 'Giới tính đối phương',
     },
     {
          title: 'Nickname',
     },
];
const StepProcess = ({activeStep}) => {

     const items = steps.map((item) => ({
          key: item.title,
          title: item.title,
     }));

     return (
          <>
               <Steps current={activeStep} items={items} />         
          </>
     );
};
export default StepProcess;

StepProcess.propTypes = {
     activeStep: propTypes.number
}