import { ChatService } from "../../services/ChatService.js";

// Cargar el HTML dinámicamente (para simular un sistema modular)
const container = document.getElementById("chat-container");
const html = await fetch("./interfaces/chat/chatList.html").then((res) => res.text());
container.innerHTML = html;

const chatService = new ChatService();
const listEl = document.getElementById("chat-list");
const formEl = document.getElementById("chat-form");

async function cargarChats() {
  try {
    const chats = await chatService.listarChats();
    listEl.innerHTML = chats
      .map(
        (c) =>
          `<li><strong>${c.id_user}</strong> → ${c.id_mentor}: ${c.message} <em>(${new Date(
            c.timestamp
          ).toLocaleString()})</em></li>`
      )
      .join("");
  } catch (err) {
    console.error(err);
    listEl.innerHTML = "<li>Error al cargar los chats</li>";
  }
}

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = document.getElementById("message").value;
  const id_user = document.getElementById("id_user").value;
  const id_mentor = document.getElementById("id_mentor").value;

  try {
    await chatService.crearChat(message, id_user, id_mentor);
    formEl.reset();
    await cargarChats();
  } catch (err) {
    alert("Error al crear chat: " + err.message);
  }
});

cargarChats();
