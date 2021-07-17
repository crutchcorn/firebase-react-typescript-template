import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/functions";

const firebaseConfig = {
  apiKey: "EXAMPLE_API_KEY",
  authDomain: "EXAMPLE_AUTH_DOMAIN",
  databaseURL: "EXAMPLE_DATABASE_URL",
  projectId: "EXAMPLE_PROJECT_ID",
  storageBucket: "EXAMPLE_STORAGE_BUCKEY",
  messagingSenderId: "EXAMPLE_MESSAGE_SENDER_ID"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
// Used for creating child accounts, primarily
export const firebaseSecondaryApp = firebase.initializeApp(firebaseConfig, 'Secondary');
export const firebaseAuth = firebaseApp.auth();
export const firebaseSecondaryAuth = firebaseSecondaryApp.auth();
export const firebaseDb = firebaseApp.database();
export const firebaseFunc = firebaseApp.functions();
