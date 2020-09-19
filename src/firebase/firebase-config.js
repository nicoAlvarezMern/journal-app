import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAZJHWw-zhwcyFbblHmfZW5ljiy_MWmR3Y",
    authDomain: "journal-app-fd259.firebaseapp.com",
    databaseURL: "https://journal-app-fd259.firebaseio.com",
    projectId: "journal-app-fd259",
    storageBucket: "journal-app-fd259.appspot.com",
    messagingSenderId: "1058446717652",
    appId: "1:1058446717652:web:3d98592ab06b38312e0141"
  };
  
  firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}