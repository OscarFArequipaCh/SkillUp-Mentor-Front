export class UserRepository {
  constructor() {
    this.apiUrl = "http://localhost:3000/api/users";
  }

  async getAll() {
    const res = await fetch(this.apiUrl);
    if (!res.ok) throw new Error("Error al obtener usuarios");
    return await res.json();
  }

  async getById(id) {
    const res = await fetch(`${this.apiUrl}/${id}`);
    if (!res.ok) throw new Error("Usuario no encontrado");
    return await res.json();
  }

  async authentcate(dataUser) {
    console.log("Authenticating user with data:", dataUser);
    const res = await fetch(`${this.apiUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataUser),
    });
    if (!res.ok) throw new Error("Error de autenticación");
    return await res.json();
  }

  async create(userFormData) {
    const res = await fetch(this.apiUrl, {
      method: "POST",
      body: userFormData, // ✅ Sin headers
    });

    if (!res.ok) throw new Error("Error al crear usuario");
    return await res.json();
  }

  async update(id, user) {
    const res = await fetch(`${this.apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error("Error al actualizar usuario");
    return await res.json();
  }

  async delete(id) {
    const res = await fetch(`${this.apiUrl}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar usuario");
    return await res.json();
  }
}
