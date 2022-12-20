importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_ID,
    appId: process.env.REACT_APP_FIREBASE_APPID,    
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};
firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();
// messaging.onBackgroundMessage(function (payload) {
//   console.log("Received background message ", payload);
//   const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//       body: payload.notification.body,
//       icon: "/logo192.png",
//   };
// return self.registration.showNotification(
//     notificationTitle,
//     notificationOptions
//   );
// });