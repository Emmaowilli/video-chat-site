import { auth, db } from "./firebase.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import { doc, setDoc } from
"https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

window.register = async () => {
    const email = regEmail.value;
    const password = regPassword.value;
    const username = regUsername.value;

    const cred = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", cred.user.uid), {
        username,
        createdAt: new Date()
    });

    alert("Registered!");
};

window.login = async () => {
    await signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value);
};
