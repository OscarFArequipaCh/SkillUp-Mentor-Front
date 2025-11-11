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

  async authenticateUser(email, password){
    if(!email || !password){
      throw new Error("Email y contraseña son obligatorios");
    }
    //const loginData = { email, password };
    //const authenticatedUser = await this.repo.authentcate(loginData);
    //return authenticatedUser;
    const authenticatedUser = await this.repo.authentcate({ email, password });
    console.log(authenticatedUser);
    return authenticatedUser; // devuelve JSON correcto del backend

    //const authenticateUser = new User(null, null, email, null, password);
    
    //return await this.repo.authentcate(authenticateUser);
    
  }

  async createUser(name, email, role, password, photoFile) {
    if (!name || !email || !role || !password) {
      throw new Error("Todos los campos son obligatorios");
    }
    //const nuevo = new User(null, name, email, role, password);
    //return await this.repo.create(nuevo);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);
    formData.append("password", password);

    if (photoFile) {
      formData.append("photo", photoFile);
    }

    return await this.repo.create(formData);
  }

  async deleteUser(id) {
    return await this.repo.delete(id);
  }
}
