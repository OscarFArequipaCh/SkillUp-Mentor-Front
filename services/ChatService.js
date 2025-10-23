import { ChatRepository } from "../repositories/ChatRepository.js";
import { Chat } from "../models/Chat.js";

export class ChatService {
  constructor() {
    this.repo = new ChatRepository();
  }

  async listarChats() {
    const data = await this.repo.getAll();
    return data.map(
      (c) => new Chat(c.id, c.id_sender, c.id_receiver, c.created_at)
    );
  }

  async crearChat(id_sender, id_receiver) {
    const nuevo = new Chat(null, id_sender, id_receiver);
    return await this.repo.create(nuevo);
  }
}
