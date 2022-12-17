import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './hooks/useAuth';
import { PeerContextProvider } from './hooks/PeerContext';
import * as serviceWorker from './service-worker'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <PeerContextProvider>
      <App />
    </PeerContextProvider>    
  </AuthProvider>   
 
);

serviceWorker.register()

