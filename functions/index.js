const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { arrayUnion } = require("firebase/firestore");
admin.initializeApp(functions.config().firebase);

exports.newUserSignup = functions.auth.user().onCreate(user => {
    return admin.firestore().collection('userChats').doc(user.uid).set({})
});

exports.userDeleted = functions.auth.user().onDelete(user => {
    const doc = admin.firestore().collection('users').doc(user.uid);
    return doc.delete();
});