const container = document.getElementById("chat-container");

const nav = document.createElement("nav");
nav.innerHTML = `
  <button id="nav-chat">💬 Chats</button>
  <button id="nav-user">👤 Usuarios</button>
`;

// 🔧 Cambiado insertBefore → appendChild
document.body.appendChild(nav);

async function cargarVista(ruta) {
  container.innerHTML = "<p>Cargando...</p>";
  await import(ruta);
}

document.getElementById("nav-chat").addEventListener("click", () =>
  cargarVista("./interfaces/chat/chatList.js")
);

document.getElementById("nav-user").addEventListener("click", () =>
  cargarVista("./interfaces/user/userList.js")
);

// Vista inicial
cargarVista("./interfaces/user/userList.js");
