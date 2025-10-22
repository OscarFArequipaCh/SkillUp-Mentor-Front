import { ChatRepository } from "../repositories/ChatRepository.js";
import { Chat } from "../models/Chat.js";

export class ChatService {
  constructor() {
    this.repo = new ChatRepository();
  }

  async listarChats() {
    const data = await this.repo.getAll();
    return data.map(
      (c) => new Chat(c.id, c.message, c.timestamp, c.id_user, c.id_mentor)
    );
  }

  async crearChat(message, id_user, id_mentor) {
    const nuevo = new Chat(null, message, new Date().toISOString(), id_user, id_mentor);
    return await this.repo.create(nuevo);
  }
}
