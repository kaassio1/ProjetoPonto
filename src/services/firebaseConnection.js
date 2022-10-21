import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
  apiKey: "AIzaSyD5ZYnB9M0WPvffGPXfEHvi32sU7acQIhs",
  authDomain: "projetoponto-bf52b.firebaseapp.com",
  databaseURL: "https://projetoponto-bf52b-default-rtdb.firebaseio.com",
  projectId: "projetoponto-bf52b",
  storageBucket: "projetoponto-bf52b.appspot.com",
  messagingSenderId: "735113115471",
  appId: "1:735113115471:web:86fb3e2a76cdf08e92f73a",
  measurementId: "G-1EX9W23V1Z"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;