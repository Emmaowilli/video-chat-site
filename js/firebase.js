import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyAZxZviduCMHT-PQ32nELRigumk_zpUtmA",
    authDomain: "emma-s-app-2740a.firebaseapp.com",
    projectId: "emma-s-app-2740a",
    storageBucket: "emma-s-app-2740a.firebasestorage.app",
    messagingSenderId: "804093914366",
    appId: "1:804093914366:web:119cec1892e707a34989af"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
