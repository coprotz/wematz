import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_ID,
    appId: process.env.REACT_APP_FIREBASE_APPID,    
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};
firebase.initializeApp(firebaseConfig);


export const messaging = firebase.messaging();
const { REACT_APP_VAPID_KEY } = process.env
const publicKey = REACT_APP_VAPID_KEY;

// export const getToken = async (setTokenFound) => {
//     let currentToken = '';
//     try {
//       currentToken = await messaging.getToken({vapidKey: publicKey});
//       if (currentToken) {
//         setTokenFound(true);
//       } else {
//         setTokenFound(false);
//       }
//     } catch (error) {
//       console.log('An error occurred while retrieving token.', error);
//     }
//     return currentToken;
//   };

  // export const onMessageListener = () =>
  // new Promise((resolve) => {
  //   messaging.onMessage((payload) => {
  //     resolve(payload);
  //   });
  // });