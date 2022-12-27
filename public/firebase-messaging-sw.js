// importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";
// const { initializeApp } = require("firebase/app")
// const { getMessaging } = require("firebase/messaging")
// const { onBackgroundMessage } = require("firebase/messaging/sw")


const firebaseApp = initializeApp({
    apiKey: "AIzaSyByQ6_AXXj6EuiT7QfD6r6wTB6UuumrXl8",
    projectId: "wema-68a94",
    storageBucket: "wema-68a94.appspot.com",
    databaseURL: 'https://wema-68a94.firebaseio.com',
    messagingSenderId: "49323722271",
    appId: "1:949323722271:web:aa08a916ed2dac80672f2a",    
    authDomain: "wema-68a94.firebaseapp.com",
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