import { db, auth } from "./firebase.js";
import { doc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

window.addFriend = async (friendId) => {
  await updateDoc(doc(db, "users", friendId), {
    requests: arrayUnion(auth.currentUser.uid)
  });
  alert("Friend request sent");
};

window.acceptFriend = async (friendId) => {
  await updateDoc(doc(db, "users", auth.currentUser.uid), {
    friends: arrayUnion(friendId)
  });
};
