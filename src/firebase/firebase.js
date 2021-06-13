import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCFRNvM9kWo3TRoBmsxjYzm_uCV4f0fnGw",
  authDomain: "final-project-885cd.firebaseapp.com",
  projectId: "final-project-885cd",
  storageBucket: "final-project-885cd.appspot.com",
  messagingSenderId: "569759047049",
  appId: "1:569759047049:web:6cdcb66ad8d11cfbd9d558",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
