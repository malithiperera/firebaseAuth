// Import the functions you need from the SDKs you need
import React from "react";
import { initializeApp } from "firebase/app";

import {GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut} from "firebase/auth";
import {
       getFirestore,
     query,
     getDocs,
    collection,
      where,
     addDoc,
 } from "firebase/firestore";

 const apiKey=process.env.REACT_APP_API_KEY;
 const authDomain=process.env.REACT_APP_AUTH_DOMAIN;
const firebaseConfig = {
  apiKey: {apiKey},
  authDomain: {authDomain},
  projectId: "fir-auth-1f802",
  storageBucket: "fir-auth-1f802.appspot.com",
  messagingSenderId: "356743268893",
  appId: "1:356743268893:web:749d70d9b4f2cb1aea14f4",
  measurementId: "G-LNMRSL5CWM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const logout = () => {
    signOut(auth);
  };

  export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
  };