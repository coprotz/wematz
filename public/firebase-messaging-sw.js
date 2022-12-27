// importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";
// const { initializeApp } = require("firebase/app")
// const { getMessaging } = require("firebase/messaging")
// const { onBackgroundMessage } = require("firebase/messaging/sw")


const firebaseApp = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_ID,
    appId: process.env.REACT_APP_FIREBASE_APPID,    
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
});
firebase.initializeApp(firebaseApp);

const messaging = getMessaging();
onBackgroundMessage(messaging, (payload) => {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: "/images/logo_192.png",
  };
return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});