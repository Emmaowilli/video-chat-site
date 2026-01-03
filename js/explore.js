document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("exploreResults");

  if (!container) return; // prevents crash

  fetchExploreContent(container);
});

function fetchExploreContent(container) {
  const items = [
    { type: "image", src: "assets/images/photo1.jpg", name: "Emma" },
    { type: "image", src: "assets/images/photo2.jpg", name: "Lydia" }
  ];

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "explore-card";

    const img = document.createElement("img");
    img.src = item.src;

    const label = document.createElement("p");
    label.textContent = item.name;

    card.append(img, label);
    container.appendChild(card);
  });
}

