const firebase = require('firebase')
const firebaseConfig = {
    apiKey: "AIzaSyDtbTKVcg4qvWe4LdwZsCasvDKQqFUFSf4",
    authDomain: "tomyum-from-hell.firebaseapp.com",
    projectId: "tomyum-from-hell",
    storageBucket: "tomyum-from-hell.appspot.com",
    messagingSenderId: "677654186399",
    appId: "1:677654186399:web:49cc20b1e1760ca8e7d5aa",
    measurementId: "G-GQYXHNCMWM"
  };
firebase.initializeApp(firebaseConfig)
const db=firebase.fireStore()
const User = db.collection('Users');
module.exports = User