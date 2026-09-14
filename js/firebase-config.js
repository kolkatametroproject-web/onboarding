import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCbdhpjgasLWzxnpNrOWUVexhekS3iKYvg",
  authDomain: "onboarding-mrpsp.firebaseapp.com",
  databaseURL: "https://onboarding-mrpsp-default-rtdb.firebaseio.com",
  projectId: "onboarding-mrpsp",
  storageBucket: "onboarding-mrpsp.firebasestorage.app",
  messagingSenderId: "81624365626",
  appId: "1:81624365626:web:e3de822baeb7c339e19303"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
export default app;