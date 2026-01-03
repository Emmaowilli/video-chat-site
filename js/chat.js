import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

import { db } from "./firebase.js";

export function loadChat(chatId) {
  const box = document.getElementById("chatMessages");
  if (!box) return;

  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("createdAt")
  );

  onSnapshot(q, snap => {
    box.innerHTML = "";

    snap.forEach(doc => {
      const m = doc.data(); // ✅ THIS WAS MISSING

      const div = document.createElement("div");
      div.className = "message";

      if (m.type === "image") {
        const img = document.createElement("img");
        img.src = m.content;
        div.appendChild(img);
      } else if (m.type === "video") {
        const video = document.createElement("video");
        video.src = m.content;
        video.controls = true;
        div.appendChild(video);
      } else {
        div.textContent = m.content;
      }

      box.appendChild(div);
    });
  });
}

