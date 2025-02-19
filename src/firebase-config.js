// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2oloCkw25JQ9DHL_-J3xUOCA1q3gU6vU",
  authDomain: "neurosongs-file-storage.firebaseapp.com",
  projectId: "neurosongs-file-storage",
  storageBucket: "neurosongs-file-storage.firebasestorage.app",
  messagingSenderId: "258711973688",
  appId: "1:258711973688:web:aa352789964fb927119bcd",
  measurementId: "G-2S989ZS972",
  storageBucket: "neurosongs-file-storage.firebasestorage.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, analytics, storage };