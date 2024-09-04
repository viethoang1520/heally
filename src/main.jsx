import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import GlobalStyles from './Components/GlobalStyles/GlobalStyles.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChatProvider } from './Context/ChatContext.jsx';
import { AppProvider } from './Context/AppContext.jsx';
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <AppProvider>
      <ChatProvider>
        <GlobalStyles>
            <App />
          <ToastContainer position="top-center" hideProgressBar limit={3} />
          <Toaster />
        </GlobalStyles>
      </ChatProvider>
    </AppProvider>
  </React.Fragment>
);
