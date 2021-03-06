import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'travel-list-app.firebaseapp.com',
  projectId: 'travel-list-app',
  storageBucket: 'travel-list-app.appspot.com',
  messagingSenderId: '395894151335',
  appId: '1:395894151335:web:dbb08e9d6b3deb9f00a382',
  measurementId: 'G-TDWHN9MLQ8',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// @ts-ignore
global.fff = firebase;
