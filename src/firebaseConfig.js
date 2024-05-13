// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZceNnlQp8DLMI3U0bzwcXWCVb2u_heqk",
  authDomain: "maritimesystem.firebaseapp.com",
  projectId: "maritimesystem",
  storageBucket: "maritimesystem.appspot.com",
  messagingSenderId: "154410081470",
  appId: "1:154410081470:web:fee5b539185dbb037c92ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage=getStorage(app)
export default storage