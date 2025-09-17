// firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your Firebase config - replace with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyCfx6n5YGZQDLXnjXhdj34BxWoKLhcc_Wk",
  authDomain: "googoloshermanos.firebaseapp.com",
  projectId: "googoloshermanos",
  storageBucket: "googoloshermanos.firebasestorage.app",
  messagingSenderId: "289672592840",
  appId: "1:289672592840:web:c96d4ef0b2b1becb0794fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and get a reference to the service
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;