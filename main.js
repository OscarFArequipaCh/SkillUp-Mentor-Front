import { UserService } from "./services/UserService.js";
const userService = new UserService();

const container = document.getElementById("chat-container");
const sessionArea = document.getElementById("session-area");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const navbar = document.getElementById("navbar");

//const nav = document.createElement("nav");
navbar.innerHTML = `
  <button id="nav-chat">💬 Chats</button>
  <button id="nav-user" class="protected">👤 Usuarios</button>
  <button id="nav-apprentice">🎓 Aprendices</button>
  <button id="nav-mentor">🧑‍🏫 Mentores</button>
`;
//document.body.appendChild(navbar);

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
  closeModal();
}

// ✅ Botón dinámico según sesión
function renderSessionButton() {
  const authUser = userService.getAuthUser();

  if (!authUser) {
    sessionArea.innerHTML = `<button id="button-login">Iniciar Sesión</button>`;
    document.getElementById("button-login").addEventListener("click", () =>
      Modal("./interfaces/login/login.js", "renderLogin")
    );
  } else {
    sessionArea.innerHTML = `
      <div class="dropdown">
        <button id="display-menu" class="dropbtn">👋 ${authUser.name} ▼</button>
        <div id="options-menu" class="dropdown-content" style="display: none;">
          <a id="logout-btn">Cerrar Sesión</a>
        </div>
      </div>
    `;
    document.getElementById("display-menu").addEventListener("click", () => {
      document.getElementById("options-menu").style.display = "block";
    });
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
};

async function Modal(ruta, funcionRender) {
  modal.style.display = "block";
  const modulo = await import(ruta);
  modulo[funcionRender](modalContent);
  modalContent.innerHTML = "<button id='CloseModal'>Cerrar</button>";
  document.getElementById("CloseModal").addEventListener("click", closeModal);
}

async function closeModal() {
  modal.style.display = "none";
  //modalContent.innerHTML = "<button id='CloseModal'>Cerrar</button>";
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
document.getElementById("nav-mentor").addEventListener("click", () =>
  cargarVista("./interfaces/user/mentorList.js", "renderMentorList")
);

renderSessionButton();
updateViewProtection();
cargarVista("./interfaces/chats/chatList.js", "renderChatList");

