import { ApprenticeService } from "../../services/ApprenticeService.js";

export async function renderApprenticeList(container) {
  //const container = document.getElementById("chat-container");
  const html = await fetch("./interfaces/user/apprenticeList.html").then((res) => res.text());
  container.innerHTML = html;

  const apprenticeService = new ApprenticeService();
  const tbody = document.getElementById("apprentice-table-body");

  async function loadApprentice() {
    try {
      const apprentices = await apprenticeService.listApprentice();
      tbody.innerHTML = apprentices
        .map(
          (a) => `
          <tr>
            <td>${a.id}</td>
            <td>${a.certificates}</td>
            <td>${a.languajes}</td>
            <td>${a.degree}</td>
            <td>${a.gender}</td>
            <td>${a.user.name}</td>
            <td>${a.user.email}</td>
          </tr>`
        )
        .join("");
    } catch (err) {
      console.error(err);
      tbody.innerHTML = "<tr><td colspan='5'>Error al cargar aprendices</td></tr>";
    }
  }

  loadApprentice();
}