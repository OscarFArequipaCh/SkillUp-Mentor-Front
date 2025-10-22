import { UserRepository } from "../repositories/UserRepository.js";
import { User } from "../models/User.js";

export class UserService {
  constructor() {
    this.repo = new UserRepository();
  }

  async listarUsuarios() {
    const data = await this.repo.getAll();
    return data.map((u) => new User(u.id, u.name, u.email, u.role, u.password));
  }

  async crearUsuario(name, email, role, password) {
    if (!name || !email || !role || !password) {
      throw new Error("Todos los campos son obligatorios");
    }
    const nuevo = new User(null, name, email, role, password);
    return await this.repo.create(nuevo);
  }

  async eliminarUsuario(id) {
    return await this.repo.delete(id);
  }
}
