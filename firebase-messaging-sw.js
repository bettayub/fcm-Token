// firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);

// Note: Service workers must use the compat version as the modular API
// is not supported in service workers
firebase.initializeApp({
  apiKey: "AIzaSyAeXdW0tveIGclyNT0OOTGY77q-4bnanEs",
  authDomain: "matx-5a0e6.firebaseapp.com",
  projectId: "matx-5a0e6",
  messagingSenderId: "63114335329",
  appId: "1:63114335329:web:4a47a450a10f21a48b8620",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
