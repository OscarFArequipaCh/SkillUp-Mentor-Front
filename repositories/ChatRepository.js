export class ChatRepository {
  constructor() {
    this.apiUrl = "http://localhost:3000/api/chats";
  }

  async getAll() {
    const res = await fetch(this.apiUrl);
    if (!res.ok) throw new Error("Error al obtener los chats");
    return await res.json();
  }

  async create(chat) {
    const res = await fetch(this.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chat),
    });
    if (!res.ok) throw new Error("Error al crear chat");
    return await res.json();
  }
}
