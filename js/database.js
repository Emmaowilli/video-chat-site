import { db } from "./firebase.js";
import {
  collection, addDoc, query, orderBy, onSnapshot, serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

export function listenToMessages(chatId, callback) {
  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("createdAt")
  );

  onSnapshot(q, snap => {
    const msgs = snap.docs.map(d => d.data());
    callback(msgs);
  });
}

export async function sendMessage(chatId, message) {
  await addDoc(collection(db, "chats", chatId, "messages"), {
    ...message,
    createdAt: serverTimestamp()
  });
}
