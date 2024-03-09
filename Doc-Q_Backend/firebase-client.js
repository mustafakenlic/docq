import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxOVWoIQydSmoNWp8G9ZuBfC9XMFYvnh4",
  authDomain: "doc-q-5cfe1.firebaseapp.com",
  projectId: "doc-q-5cfe1",
  storageBucket: "doc-q-5cfe1.appspot.com",
  messagingSenderId: "791700607387",
  appId: "1:791700607387:web:c389414998ca75963ad13e",
  measurementId: "G-EE9LVB1LCE"
};

const app = initializeApp(firebaseConfig);
const clientAuth = getAuth(app);

export {clientAuth}