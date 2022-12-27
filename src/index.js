import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { AuthProvider } from './hooks/useAuth.js';
import { PeerContextProvider } from './hooks/PeerContext.js';
import { ChatContextProvider } from './hooks/chatsContext.js';


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



