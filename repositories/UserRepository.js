export class UserRepository {
  constructor() {
    this.apiUrl = "http://localhost:3000/api/users";
    this.SERVER_URL = "http://localhost:3000";
  }

  normalize(u) {
    return {
      ...u,
      photoUrl: u.photo
        ? `${this.SERVER_URL}${u.photo}`
        : "./assets/default-user.png"
    };
  }

  async getAll(token) {
    const res = await fetch(this.apiUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("No autorizado");

    const data = await res.json();
    return data.map(u => this.normalize(u));  // ⬅️ Aquí llamas al helper
  }

  async authenticate(dataUser) {
    const res = await fetch(`${this.apiUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataUser),
    });
    if (!res.ok) throw new Error("Error de autenticación");
    return await res.json();
  }

  async create(userFormData, token) {
    const res = await fetch(this.apiUrl, {
      method: "POST",
      body: userFormData,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("No autorizado - Crear usuario");
    return await res.json();
  }

  async delete(id, token) {
    const res = await fetch(`${this.apiUrl}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("No autorizado - Eliminar usuario");
    return await res.json();
  }
}
