import firebase from "firebase/app"
import database from "firebase/database"

const firebaseConfig = {}

firebase.initializeApp(firebaseConfig)

let dbRef = firebase.database().ref();

const urlParams = new URLSearchParams(window.location.search)
const roomId = urlParams.get('id')

if(roomId){
    dbRef = dbRef.child(roomId)
}else {
    dbRef = dbRef.push()
    window.history.replaceState(null, "Birr", "?id=" + dbRef.key)
}