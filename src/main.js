let scenes = {};

const ARROWS = { forward: "↑", back: "↓", left: "←", right: "→" };

async function init() {
  const res = await fetch("../data/scenes.json");
  const data = await res.json();
  data.scenes.forEach((s) => (scenes[s.id] = s));
  buildRoomMenu(data.scenes);
  showScene(data.scenes[0].id);
}

function showScene(id) {
  const scene = scenes[id];
  if (!scene) return;
  document.getElementById("scene-image").src = "../" + scene.image;
  document.getElementById("scene-label").textContent = scene.label;

  const arrows = document.getElementById("arrows");
  arrows.innerHTML = "";
  scene.links.forEach((link) => {
    const btn = document.createElement("button");
    btn.className = link.direction;
    btn.textContent = ARROWS[link.direction] || "•";
    btn.onclick = () => showScene(link.to);
    arrows.appendChild(btn);
  });
}

function buildRoomMenu(list) {
  const ul = document.getElementById("room-list");
  list.forEach((scene) => {
    scene.rooms.forEach((room) => {
      const li = document.createElement("li");
      li.textContent = "Suite " + room;
      li.onclick = () => showScene(scene.id);
      ul.appendChild(li);
    });
  });
}

init();