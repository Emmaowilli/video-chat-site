/* ============================
   IMPORTS
============================ */
import { auth, db, storage } from "./firebase.js";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

/* ============================
   GLOBAL STATE
============================ */
let currentUser = null;
let currentChatFriend = null;

/* ============================
   PAGE LOADER
============================ */
window.loadPage = async (page) => {
  const content = document.getElementById("content");
  content.innerHTML = "Loading...";

  try {
    const res = await fetch(page);
    content.innerHTML = await res.text();

    if (page.includes("home.html")) loadHome();
    if (page.includes("profile.html")) loadProfile();
    if (page.includes("chat.html")) loadChatFriends();
  } catch {
    content.innerHTML = "<h2>Page not found</h2>";
  }
};

/* ============================
   AUTH STATE
============================ */
onAuthStateChanged(auth, (user) => {
  currentUser = user;
  document.getElementById("logoutBtn").style.display = user ? "inline-block" : "none";
  loadPage(user ? "pages/home.html" : "pages/login.html");
});

/* ============================
   AUTH FUNCTIONS
============================ */
window.register = async () => {
  const email = regEmail.value;
  const password = regPassword.value;
  const username = regUsername.value || "User";

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", cred.user.uid), {
      username,
      createdAt: serverTimestamp(),
      profilePic: "",
      online: true
    });
    alert("Registered successfully! Welcome " + username);
  } catch (err) {
    alert("Error: " + err.message);
  }
};

window.login = async () => {
  try {
    await signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value);
  } catch (err) {
    alert("Login failed: " + err.message);
  }
};

window.logout = async () => {
  await signOut(auth);
};

/* ============================
   HOME - ONE COMMUNITY GRID WITH 18 NAMED IMAGES
============================ */
async function loadHome() {
  const gallery = document.getElementById("recommendedGrid");
  if (!gallery) return;

  gallery.innerHTML = "";

  // 18 images with beautiful names
  const community = [
    { src: "images/1738616231284.jpg", name: "Emma" },
    { src: "images/1000146336 - Copy.jpg", name: "Grace" },
    { src: "images/1000146337 - Copy.jpg", name: "Sarah" },
    { src: "images/1000146344.jpg", name: "Lydia" },
    { src: "images/1000146338 - Copy.jpg", name: "Aisha" },
    { src: "images/1000146340 - Copy.jpg", name: "Fatima" },
    { src: "images/1000146341 - Copy.jpg", name: "Zainab" },
    { src: "images/1000146342.jpg", name: "Maryam" },
    { src: "images/1000146344.jpg", name: "Sophia" },
    { src: "images/1000146345 - Copy.jpg", name: "Olivia" },
    { src: "images/1000146346 - Copy.jpg", name: "Amelia" },
    { src: "images/1000146347 - Copy.jpg", name: "Isabella" },
    { src: "images/1000146349.jpg", name: "Mia" },
    { src: "images/1000146350.jpg", name: "Charlotte" },
    { src: "images/1000146351.jpg", name: "Harper" },
    { src: "images/1000146352.jpg", name: "Evelyn" },
    { src: "images/1000146353.jpg", name: "Abigail" },
    { src: "images/1000146342.jpg", name: "Emily" }
  ];

  community.forEach(person => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <img src="${person.src}" alt="${person.name}">
      <h3>${person.name}</h3>
      <button onclick="alert('Friend request sent to ${person.name}!')">Add Friend</button>
    `;
    gallery.appendChild(card);
  });
}

/* ============================
   PROFILE
============================ */
async function loadProfile() {
  if (!currentUser) return;
  const snap = await getDoc(doc(db, "users", currentUser.uid));
  if (!snap.exists()) return;

  const d = snap.data();
  if (usernameInput) usernameInput.value = d.username || "";
  if (currentProfilePic) currentProfilePic.src = d.profilePic || "https://via.placeholder.com/150";
}

window.saveProfile = async () => {
  if (!currentUser) return;
  await updateDoc(doc(db, "users", currentUser.uid), {
    username: usernameInput.value
  });
  alert("Profile saved!");
};

window.uploadProfilePic = async () => {
  const file = profilePicInput.files[0];
  if (!file || !currentUser) return;

  const r = ref(storage, `profiles/${currentUser.uid}`);
  await uploadBytes(r, file);
  const url = await getDownloadURL(r);

  await updateDoc(doc(db, "users", currentUser.uid), { profilePic: url });
  currentProfilePic.src = url;
  alert("Photo uploaded!");
};

window.takePhoto = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement("video");
    video.srcObject = stream;
    video.autoplay = true;
    video.style.position = "fixed";
    video.style.top = "50%";
    video.style.left = "50%";
    video.style.transform = "translate(-50%, -50%)";
    video.style.zIndex = "1000";
    video.style.maxWidth = "90%";
    video.style.borderRadius = "15px";
    video.style.boxShadow = "0 0 30px rgba(0,0,0,0.7)";
    document.body.appendChild(video);

    // Simple capture after 3 seconds
    setTimeout(() => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      canvas.toBlob(blob => {
        // You can upload blob here later
        alert("Photo captured! (Ready to upload)");
      });
    }, 3000);
  } catch {
    alert("Camera access denied");
  }
};

/* ============================
   EXPLORE
============================ */
window.searchYouTube = () => {
  const q = searchInput?.value.trim();
  if (!q) return;

  videoResults.innerHTML = `
    <iframe
      width="100%"
      height="400"
      src="https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(q)}"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>
  `;
};

/* ============================
   CHAT
============================ */
async function loadChatFriends() {
  const select = document.getElementById("chatFriend");
  if (!select) return;

  select.innerHTML = "<option value=''>Select Friend</option>";
  const users = await getDocs(collection(db, "users"));

  users.forEach(u => {
    if (u.id === currentUser?.uid) return;
    const opt = document.createElement("option");
    opt.value = u.id;
    opt.textContent = u.data().username || "Friend";
    select.appendChild(opt);
  });
}

window.loadChat = (uid) => {
  currentChatFriend = uid;
  const chatId = [currentUser.uid, uid].sort().join("_");
  const chatBox = document.getElementById("chatBox");
  if (!chatBox) return;

  chatBox.innerHTML = "<p>Start chatting...</p>";
  onSnapshot(collection(db, "chats", chatId, "messages"), snap => {
    chatBox.innerHTML = "";
    snap.forEach(d => {
      const m = d.data();
      const p = document.createElement("p");
      p.textContent = (m.sender === currentUser.uid ? "You" : "Friend") + ": " + (m.text || "[Media]");
      p.style.textAlign = m.sender === currentUser.uid ? "right" : "left";
      p.style.color = m.sender === currentUser.uid ? "#667eea" : "#764ba2";
      chatBox.appendChild(p);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
  });
};

window.sendMessage = async () => {
  const input = document.getElementById("messageInput");
  const text = input?.value.trim();
  if (!text || !currentChatFriend) return;

  const chatId = [currentUser.uid, currentChatFriend].sort().join("_");
  await addDoc(collection(db, "chats", chatId, "messages"), {
    text,
    sender: currentUser.uid,
    timestamp: serverTimestamp()
  });
  input.value = "";
};

window.recordAudio = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    alert("Recording started for 5 seconds...");
    setTimeout(() => alert("Audio recorded! (Upload coming soon)"), 5000);
  } catch {
    alert("Microphone access denied");
  }
};

window.startCallChat = () => alert("Voice call starting...");
window.startVideoCallChat = () => loadPage("pages/video.html");

/* ============================
   IMAGE MODAL (CLICK TO ZOOM)
============================ */
document.addEventListener("click", e => {
  const img = e.target.closest(".user-card img");
  if (img) {
    let modal = document.querySelector(".image-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "image-modal";
      modal.innerHTML = `<img><span class="close-modal">×</span>`;
      modal.querySelector(".close-modal").onclick = () => modal.classList.remove("show");
      modal.onclick = (ev) => {
        if (ev.target === modal) modal.classList.remove("show");
      };
      document.body.appendChild(modal);
    }
    modal.querySelector("img").src = img.src;
    modal.classList.add("show");
  }
});

/* ============================
   INITIAL LOAD
============================ */
loadPage("pages/login.html");


