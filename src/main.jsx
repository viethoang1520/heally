import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import GlobalStyles from './Components/GlobalStyles/GlobalStyles.jsx';
import { ChatProvider } from './Context/ChatContext.jsx';
import { AppProvider } from './Context/AppContext.jsx';
import { Toaster } from 'sonner';
// import { Toaster } from "react-hot-toast"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <AppProvider>
      <ChatProvider>
        <GlobalStyles>
          <App />
          <Toaster
            richColors={true}
            position="top-center"
            closeButton={true}
            toastOptions={{
              style: {
                padding: "22px",
              }
            }}
          />
        </GlobalStyles>
      </ChatProvider>
    </AppProvider>
  </React.Fragment>
);
