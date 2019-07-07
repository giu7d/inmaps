import * as firebase from 'firebase/app';
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore"

const config = {
  apiKey: 'AIzaSyCDSqOGuaXdGlmyN_q4B0T2AYeLM-LTUG0',
  authDomain: 'inmaps.firebaseapp.com',
  projectId: 'inmaps',
  databaseURL: 'https://inmaps.firebaseio.com',
  storageBucket: 'gs://inmaps.appspot.com/'
};

export const fireApp = firebase.initializeApp(config);
export const fireStore = fireApp.firestore();
export const fireStorage = fireApp.storage();
export const fireAuth = fireApp.auth();

// Auth
export const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
}