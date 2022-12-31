import { useContext, useState, useEffect, createContext } from "react";
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions"
import {  getMessaging, getToken, onMessage } from 'firebase/messaging'
import { 
    onAuthStateChanged, 
    signOut, 
    signInWithEmailLink, 
    signInWithEmailAndPassword,
    getAuth,
    sendSignInLinkToEmail, 
    isSignInWithEmailLink,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect
} from 'firebase/auth'

const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_KEY,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      // databaseURL: 'https://wema-68a94.firebaseio.com',
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_ID,
      appId: process.env.REACT_APP_FIREBASE_APPID,    
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  
    };

const app = initializeApp(firebaseConfig)

firebase.initializeApp(firebaseConfig)

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const functions = getFunctions(app)
const messaging = getMessaging(app)


const AuthContext = createContext()

export function useAuth(){
    return useContext(AuthContext)
}



export const requestForToken = () => {
   
    return getToken(messaging, {vapidKey: process.env.REACT_APP_VAPID_KEY}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // setTokenFound(true);        
      } else {
        console.log('No registration token available. Request permission to generate one.');
        // setTokenFound(false);
      
      }
    }).catch((err) => {
      console.log('An error: ', err.message);
     
    });

}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });

// export const onForegroundMessage = () =>
//   new Promise((resolve) => onMessage(messaging, (payload) => resolve(payload)));


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isAuthenticating, setIsAuthenticating] = useState(true)
    const [alert, setAlert] = useState('')
    const [newMada, setNewMada] = useState(null)
    const [habari, setHabari] = useState(null)
    const [confirm, setConfirm] = useState('Do you want to send this mesaji?')
    const [viewParts, setViewParts] = useState(null)

    const sendLink = (email) =>{
        return sendSignInLinkToEmail(auth, email, {
            url: 'http://localhost:3000/account',
            handleCodeInApp: true,
        }).then(() => {
            return true
        })
    };

    function signIn(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function googleSignIn() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }


    function isSign(email){
        return isSignInWithEmailLink(auth, email).then(() => {
            return true
        })
    }

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

      function logOut(){
        return signOut(auth)
      }

 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user)
            setIsAuthenticating(false)
        })

        return () => {
            unsubscribe()
        }
    },[]);

 

    return (
        <AuthContext.Provider value={{ 
            user, 
            db, 
            sendLink, 
            signIn, 
            logOut, 
            isSign, 
            signUp, 
            alert, 
            setAlert, 
            confirm, 
            setConfirm,
            newMada, 
            setNewMada,
            googleSignIn,
            habari,
            setHabari,
            viewParts, 
            setViewParts, 
            getToken
            // messaging
             }}>
            {!isAuthenticating && children}
        </AuthContext.Provider>
    )
}