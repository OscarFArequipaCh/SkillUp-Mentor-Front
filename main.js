const container = document.getElementById("chat-container");

const nav = document.createElement("nav");
nav.innerHTML = `
  <button id="nav-chat">💬 Chats</button>
  <button id="nav-user">👤 Usuarios</button>
  <button id="nav-apprentice">🎓 Aprendices</button>
`;
document.body.appendChild(nav);

async function cargarVista(ruta, funcionRender) {
  container.innerHTML = "<p>Cargando...</p>";

  // Importa el módulo y ejecuta su función de renderizado
  const modulo = await import(ruta);
  container.innerHTML = ""; // limpia antes de renderizar
  modulo[funcionRender](container); // llama a la función exportada
}

document.getElementById("button-login").addEventListener("click", () =>
  cargarVista("./interfaces/login/login.js", "renderLogin")
);

document.getElementById("nav-chat").addEventListener("click", () =>
  cargarVista("./interfaces/chats/chatList.js", "renderChatList")
);

document.getElementById("nav-user").addEventListener("click", () =>
  cargarVista("./interfaces/user/userList.js", "renderUserList")
);

document.getElementById("nav-apprentice").addEventListener("click", () =>
  cargarVista("./interfaces/user/apprenticeList.js", "renderApprenticeList")
);

// Vista inicial
cargarVista("./interfaces/chats/chatList.js", "renderChatList");
