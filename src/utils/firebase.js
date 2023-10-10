// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: 'pictusblog-b7c58.firebaseapp.com',
  projectId: 'pictusblog-b7c58',
  storageBucket: 'pictusblog-b7c58.appspot.com',
  messagingSenderId: '910817067795',
  appId: '1:910817067795:web:0c3eed6b32935b5e8590e6',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
