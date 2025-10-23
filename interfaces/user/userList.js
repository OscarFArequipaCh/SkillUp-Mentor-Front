import { UserService } from "../../services/UserService.js";

export async function renderUserList(container) {
  //const container = document.getElementById("chat-container");
  const html = await fetch("./interfaces/user/userList.html").then((res) => res.text());
  container.innerHTML = html;

  const userService = new UserService();
  const tbody = document.getElementById("user-table-body");
  const form = document.getElementById("user-form");

  async function cargarUsuarios() {
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
            await userService.eliminarUsuario(id);
            await cargarUsuarios();
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

    try {
      await userService.crearUsuario(name, email, role, password);
      form.reset();
      await cargarUsuarios();
    } catch (err) {
      alert("Error al crear usuario: " + err.message);
    }
  });

  cargarUsuarios();
}