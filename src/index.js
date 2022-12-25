import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './hooks/useAuth';
import { PeerContextProvider } from './hooks/PeerContext';
import { ChatContextProvider } from './hooks/chatsContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <PeerContextProvider>
      <ChatContextProvider>
        <App />
      </ChatContextProvider>      
    </PeerContextProvider>    
  </AuthProvider>   
 
);



