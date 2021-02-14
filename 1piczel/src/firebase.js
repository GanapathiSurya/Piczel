import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
var firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID

      }
firebase.initializeApp(firebaseConfig);
const projectStorage = firebase.storage();
const projectfirestore = firebase.firestore();
const projectDatabase = firebase.database();
const timestamp =firebase.firestore.FieldValue.serverTimestamp;
export {projectStorage, projectfirestore,projectDatabase,timestamp}
export const auth=firebase.auth();
