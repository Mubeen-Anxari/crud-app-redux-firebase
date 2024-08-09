import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyApZ0alrbIPfIxxhBfUXyKRBKncya_6X6A",
  authDomain: "todo-crud-firebase-redux.firebaseapp.com",
  projectId: "todo-crud-firebase-redux",
  storageBucket: "todo-crud-firebase-redux.appspot.com",
  messagingSenderId: "465452030974",
  appId: "1:465452030974:web:7571758419b82242b5beaf",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default db;
