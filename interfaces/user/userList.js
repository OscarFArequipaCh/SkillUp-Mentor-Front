import { UserService } from "../../services/UserService.js";

export async function renderUserList(container) {
  //const container = document.getElementById("chat-container");
  const html = await fetch("./interfaces/user/userList.html").then((res) => res.text());
  container.innerHTML = html;

  const userService = new UserService();
  const tbody = document.getElementById("user-table-body");
  const form = document.getElementById("user-form");

  async function loadUser() {
    try {
      const users = await userService.listarUsuarios();
      tbody.innerHTML = users
        .map(
          (u) => `
          <tr>
            <td>${u.id}</td>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td>${u.role}</td>
            <td><button data-id="${u.id}" class="delete-btn">Eliminar</button></td>
          </tr>`
        )
        .join("");

      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const id = e.target.getAttribute("data-id");
          if (confirm("¿Seguro que quieres eliminar este usuario?")) {
            await userService.deleteUser(id);
            await loadUser();
          }
        });
      });
    } catch (err) {
      console.error(err);
      tbody.innerHTML = "<tr><td colspan='5'>Error al cargar usuarios</td></tr>";
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;
    const password = document.getElementById("password").value;
    const photo = document.getElementById("photo").files[0]; // ✅ Nuevo

    try {
      await userService.createUser(name, email, role, password, photo);
      form.reset();
      await loadUser();
    } catch (err) {
      alert("Error al crear usuario: " + err.message);
    }
  });

  loadUser();
}