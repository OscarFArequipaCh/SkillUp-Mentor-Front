export class User {
  constructor(id, name, email, role, password, photo) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role; // "mentor" | "apprentice" | "admin"
    this.password = password;
    this.photo = photo; // URL or base64 string
  }
}
