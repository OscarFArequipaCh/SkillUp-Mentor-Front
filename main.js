import { UserService } from "./services/UserService.js";
const userService = new UserService();

const container = document.getElementById("chat-container");
const sessionArea = document.getElementById("session-area");

const nav = document.createElement("nav");
nav.innerHTML = `
  <button id="nav-chat">💬 Chats</button>
  <button id="nav-user" class="protected">👤 Usuarios</button>
  <button id="nav-apprentice">🎓 Aprendices</button>
`;
document.body.appendChild(nav);

function updateViewProtection() {
  const protectedElems = document.querySelectorAll(".protected");
  if (userService.isAuthenticated()) {
    protectedElems.forEach(e => e.style.display = "inline-block");
  } else {
    protectedElems.forEach(e => e.style.display = "none");
  }
}

export function refreshUIAfterLogin() {
  renderSessionButton();
  updateViewProtection();
}

// ✅ Botón dinámico según sesión
function renderSessionButton() {
  const authUser = userService.getAuthUser();

  if (!authUser) {
    sessionArea.innerHTML = `<button id="button-login">Iniciar Sesión</button>`;
    document.getElementById("button-login").addEventListener("click", () =>
      cargarVista("./interfaces/login/login.js", "renderLogin")
    );
  } else {
    sessionArea.innerHTML = `
      <div class="dropdown">
        <button class="dropbtn">👋 ${authUser.name} ▼</button>
        <div class="dropdown-content">
          <a id="logout-btn">Cerrar Sesión</a>
        </div>
      </div>
    `;
    document.getElementById("logout-btn").addEventListener("click", () => {
      userService.clearSession();
      refreshUIAfterLogin();
    });
  }
}

// ✅ Sistema de enrutamiento dinámico
async function cargarVista(ruta, funcionRender) {
  container.innerHTML = "<p>Cargando...</p>";
  const modulo = await import(ruta);
  container.innerHTML = "";
  modulo[funcionRender](container);
}

// ✅ Eventos iniciales
document.getElementById("nav-chat").addEventListener("click", () =>
  cargarVista("./interfaces/chats/chatList.js", "renderChatList")
);
document.getElementById("nav-user").addEventListener("click", () =>
  cargarVista("./interfaces/user/userList.js", "renderUserList")
);
document.getElementById("nav-apprentice").addEventListener("click", () =>
  cargarVista("./interfaces/user/apprenticeList.js", "renderApprenticeList")
);

renderSessionButton();
updateViewProtection();
cargarVista("./interfaces/chats/chatList.js", "renderChatList");

