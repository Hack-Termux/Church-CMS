import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBRSE9H_vdfvRsgMPgh7SM4gnqWyKf7d4I",
  authDomain: "grace-church-cms.firebaseapp.com",
  projectId: "grace-church-cms",
  storageBucket: "grace-church-cms.firebasestorage.app",
  messagingSenderId: "795196897743",
  appId: "1:795196897743:web:8d62487d0067bdc4cffaba",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
