import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

window.register = async () => {
  const email = regEmail.value;
  const pass = regPass.value;
  const name = regName.value;

  const res = await createUserWithEmailAndPassword(auth, email, pass);

  await setDoc(doc(db, "users", res.user.uid), {
    uid: res.user.uid,
    name,
    email,
    friends: [],
    requests: []
  });

  alert("Account created");
};

window.login = async () => {
  const email = logEmail.value;
  const pass = logPass.value;
  await signInWithEmailAndPassword(auth, email, pass);
  alert("Logged in");
};

