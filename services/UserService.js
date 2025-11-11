import { UserRepository } from "../repositories/UserRepository.js";
import { User } from "../models/User.js";

export class UserService {
  constructor() {
    this.repo = new UserRepository();
  }

  saveSession(token, user) {
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));
  }

  clearSession() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  }

  getAuthUser() {
    const u = localStorage.getItem("authUser");
    return u ? JSON.parse(u) : null;
  }

  getAuthToken() {
    return localStorage.getItem("authToken");
  }

  isAuthenticated() {
    return !!this.getAuthToken();
  }

  async authenticateUser(email, password) {
    const authenticated = await this.repo.authenticate({ email, password });
    this.saveSession(authenticated.token, authenticated.user);
    return authenticated.user;
  }

  async listarUsuarios() {
    const token = this.getAuthToken();
    const data = await this.repo.getAll(token);
    return data.map((u) => new User(u.id, u.name, u.email, u.role, null));
  }

  async createUser(name, email, role, password, photoFile) {
    const token = this.getAuthToken();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);
    formData.append("password", password);
    if (photoFile) {
      formData.append("photo", photoFile);
    }

    return await this.repo.create(formData, token);
  }

  async deleteUser(id) {
    const token = this.getAuthToken();
    return await this.repo.delete(id, token);
  }
}

