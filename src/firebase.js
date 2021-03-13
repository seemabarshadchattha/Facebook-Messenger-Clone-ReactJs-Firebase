import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  //please enter your firebase configurations here
});

const db = firebaseApp.firestore();

export { db };
