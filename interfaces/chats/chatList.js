import { ChatService } from "../../services/ChatService.js";

export async function renderChatList(container) {
  const html = await fetch("./interfaces/chats/chatList.html").then((res) => res.text());
  container.innerHTML = html;

  const chatService = new ChatService();
  const listEl = document.getElementById("chat-list");
  const formEl = document.getElementById("chat-form");

  async function cargarChats() {
    try {
      const chats = await chatService.listarChats();
      if (chats.length === 0) {
        listEl.innerHTML = "<li>No hay chats registrados</li>";
        return;
      }
      listEl.innerHTML = chats
        .map(
          (c) =>
            `<li><strong>${c.id}</strong> → ${c.id_sender}: ${c.id_receiver} <em>(${new Date(
              c.created_at
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
    const id_sender = document.getElementById("id_sender").value;
    const id_receiver = document.getElementById("id_receiver").value;

    try {
      await chatService.crearChat(id_sender, id_receiver);
      formEl.reset();
      await cargarChats();
    } catch (err) {
      alert("Error al crear chat: " + err.message);
    }
  });

  cargarChats();
}
