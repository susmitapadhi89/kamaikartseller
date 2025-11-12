// src/firebase.js

import { initializeApp } from "firebase/app";

import { getMessaging, getToken, onMessage } from "firebase/messaging";
 
const firebaseConfig = {

  apiKey: "AIzaSyBzSh446YoSgF6C3PXw4hvIml2ea3Ry8QM",

  authDomain: "kamaikart.firebaseapp.com",

  projectId: "kamaikart",

  storageBucket: "kamaikart.firebasestorage.app",

  messagingSenderId: "16797217450",

  appId: "1:16797217450:web:d7c7929ba2245a29f896d3",

  measurementId: "G-QLWVMPF8CY",

};
 
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);
 
export const requestForToken = async () => {
  try {
    // 👇 Explicitly tell Firebase where to find the service worker
    const registration = await navigator.serviceWorker.register("/seller/firebase-messaging-sw.js");

    const currentToken = await getToken(messaging, {
      vapidKey: "BGexO--DxSDzD8bZEjsdQ-OhEQP-N2scEt-KwkbdWQegZqFfg_bMHwSWu4Udt682qjeUou5Xfx6dmfuv1fLi6kg",
      serviceWorkerRegistration: registration, // 👈 use this
    });

    if (currentToken) {
      console.log("FCM Token:", currentToken);
      return currentToken;
    } else {
      console.warn("No registration token available.");
    }
  } catch (err) {
    console.error("An error occurred while retrieving token:", err);
  }
};
 
// 🔔 Foreground notification listener

export const onMessageListener = () =>

  new Promise((resolve) => {

    onMessage(messaging, (payload) => {

      console.log("📩 Received foreground message:", payload);

      resolve(payload);

    });

  });
