import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDmrTEYNJceNLFP51nq9qmBLePFVMzk53E",
  authDomain: "forest-edge-31e96.firebaseapp.com",
  projectId: "forest-edge-31e96",
  storageBucket: "forest-edge-31e96.firebasestorage.app",
  messagingSenderId: "426603807314",
  appId: "1:426603807314:web:17fea9dcc2671933f7958b",
  measurementId: "G-H1Q25N08PH"
};

const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app);
export const auth = getAuth(app);
export default app;
