import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6e1P3Tqr-Bw7vSeH8GjWeTLEEcyDS40M",
  authDomain: "crud-app-80dc1.firebaseapp.com",
  projectId: "crud-app-80dc1",
  storageBucket: "crud-app-80dc1.appspot.com",
  messagingSenderId: "493327659453",
  appId: "1:493327659453:web:5fef2affeb34e1a3be62d4",
  measurementId: "G-9DSYTESJ7Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
