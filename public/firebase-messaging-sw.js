// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");
 
firebase.initializeApp({
  apiKey: "AIzaSyBzSh446YoSgF6C3PXw4hvIml2ea3Ry8QM",
  authDomain: "kamaikart.firebaseapp.com",
  projectId: "kamaikart",
  storageBucket: "kamaikart.firebasestorage.app",
  messagingSenderId: "16797217450",
  appId: "1:16797217450:web:d7c7929ba2245a29f896d3",
  measurementId: "G-QLWVMPF8CY",
});
 
const messaging = firebase.messaging();
 
messaging.onBackgroundMessage((payload) => {
  console.log("📦 Received background message:", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png", // optional
  };
 
  self.registration.showNotification(notificationTitle, notificationOptions);
});