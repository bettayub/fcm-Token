// main.js or app.js - Your main application file
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeXdW0tveIGclyNT0OOTGY77q-4bnanEs",
  authDomain: "matx-5a0e6.firebaseapp.com",
  projectId: "matx-5a0e6",
  storageBucket: "matx-5a0e6.firebasestorage.app",
  messagingSenderId: "63114335329",
  appId: "1:63114335329:web:4a47a450a10f21a48b8620",
  measurementId: "G-406KVZW0BE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

// Request permission and get token
async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const currentToken = await getToken(messaging, {
        vapidKey:
          "BG567DnvvpKPG1jqyYA7u0qnLD7z2athvRxs1_dizen5AIHP3oRXmNp-Aw9Hw4-5LVsBK3hcaYBTv0lUjT5fldM",
      });

      if (currentToken) {
        console.log("Current token:", currentToken);
        document.getElementById("token").textContent = currentToken;
        await registerToken(currentToken);
        return currentToken;
      } else {
        console.log("No registration token available");
        showStatus("No registration token available", true);
      }
    } else {
      console.log("Permission denied");
      showStatus("Permission denied for notifications", true);
    }
  } catch (error) {
    console.error("Error getting token:", error);
    showStatus("Error: " + error.message, true);
  }
}

// Register token with backend
async function registerToken(token) {
  try {
    const response = await fetch("/notifications/fcm_token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        user_id: "019513d5-b74c-7fb4-ac83-273785cb8730",
        channel: "web",
      }),
    });

    if (!response.ok) throw new Error("Registration failed");

    const data = await response.json();
    showStatus("Token registered successfully");
    console.log("Registration success:", data);
  } catch (error) {
    showStatus("Registration failed: " + error.message, true);
    console.error("Registration error:", error);
  }
}

// Display status messages
function showStatus(message, isError = false) {
  const status = document.getElementById("status");
  if (status) {
    status.textContent = message;
    status.className = `status ${isError ? "error" : "success"}`;
  }
}

// Handle foreground messages
onMessage(messaging, (payload) => {
  console.log("Message received in foreground:", payload);
  showStatus("New message: " + payload.notification.title);
});

// Initialize when the page loads
document.addEventListener("DOMContentLoaded", () => {
  requestNotificationPermission();
});

export { app, messaging };
