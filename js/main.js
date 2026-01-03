/* =========================
   GLOBAL STATE
========================= */
let currentUser = { uid: "guest", username: "Guest" };
let currentChatFriend = null;

/* =========================
   PAGE LOADER
========================= */
window.loadPage = async (page) => {
  const content = document.getElementById("content");
  if (!content) return;

  content.innerHTML = "Loading...";

  const res = await fetch(page);
  content.innerHTML = await res.text();

  if (page.includes("home")) loadHome();
  if (page.includes("explore")) initExplore();
  if (page.includes("chat")) initChat();
};

/* =========================
   HOME
========================= */
function loadHome() {
  const grid = document.getElementById("recommendedGrid");
  if (!grid) return;

  const people = [
    "Emma","Grace","Sarah","Lydia","Aisha","Fatima",
    "Zainab","Maryam","Sophia","Olivia","Amelia",
    "Isabella","Mia","Charlotte","Harper","Evelyn",
    "Abigail","Emily"
  ];

  grid.innerHTML = "";

  people.forEach((name, i) => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <img src="images/${1000146336 + i}.jpg"
           onerror="this.src='images/1738616231284.jpg'">
      <h3>${name}</h3>
      <div class="card-actions">
        <button onclick="alert('Liked ${name}')">❤️</button>
        <button onclick="loadPage('pages/chat.html')">Chat</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* =========================
   EXPLORE
========================= */
function initExplore() {
  const results = document.getElementById("exploreResults");
  const exploreInput = document.getElementById("exploreInput");
  if (!results || !exploreInput) return;

  window.searchExplore = () => {
    const q = exploreInput.value.trim();
    results.innerHTML = "";

    if (!q) return;

    if (q.match(/\.(mp4|webm|ogg)$/)) {
      results.innerHTML = `
        <video controls autoplay width="100%">
          <source src="${q}">
        </video>`;
      return;
    }

    results.innerHTML = `
      <div class="search-card">
        <p>🔎 Results for <b>${q}</b></p>
        <p>This app plays direct videos only.</p>
        <button onclick="window.open('https://www.google.com/search?q=${q}','_blank')">
          Open Web Results
        </button>
      </div>`;
  };
}

/* =========================
   CHAT
========================= */
function initChat() {
  const select = document.getElementById("chatFriend");
  const chatBox = document.getElementById("chatBox");
  const messageInput = document.getElementById("messageInput");

  if (!select || !chatBox || !messageInput) return;

  const friends = ["Emma","Grace","Sarah","Aisha"];

  select.innerHTML = `<option value="">Select Friend</option>`;
  friends.forEach(f => {
    const o = document.createElement("option");
    o.value = f;
    o.textContent = f;
    select.appendChild(o);
  });

  select.onchange = () => {
    currentChatFriend = select.value;
    chatBox.innerHTML = currentChatFriend
      ? `<p>Chatting with ${currentChatFriend}</p>`
      : "";
  };

  window.sendMessage = () => {
    if (!currentChatFriend) {
      alert("Select a friend first");
      return;
    }

    const msg = messageInput.value.trim();
    if (!msg) return;

    chatBox.innerHTML += `<p class="me">${msg}</p>`;
    messageInput.value = "";

    setTimeout(() => {
      chatBox.innerHTML += `<p class="friend">${aiReply(msg)}</p>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 800);
  };
}

/* =========================
   SIMPLE AI CHAT
========================= */
function aiReply(msg) {
  const replies = [
    "That sounds interesting 😊",
    "Tell me more about that.",
    "I understand how you feel.",
    "Wow, really?",
    "That’s nice to hear 💜"
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}

/* =========================
   START
========================= */
loadPage("pages/home.html");

window.setTheme = (theme) => {
  document.body.className = theme;
};




