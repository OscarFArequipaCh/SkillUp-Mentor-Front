import { MentorService } from "../../services/MentorService.js";

export async function renderMentorList(container) {
    const html = await fetch("./interfaces/user/mentorList.html").then((res) => res.text());
    container.innerHTML = html;

    const mentorService = new MentorService();
    const tbody = document.getElementById("mentor-table-body");

    async function loadMentor() {
        try {
            const mentors = await mentorService.listMentor();
            tbody.innerHTML = mentors
                .map(
                    (m) => `
                    <tr>
                        <td>${m.id}</td>
                        <td><img src="${m.user.photo}" alt="Foto de ${m.user.name}" width="50" height="50"></td>
                        <td>${m.user.name}</td>
                        <td>${m.user.email}</td>
                        <td>${m.area.name}</td>
                        <td>${m.pedagogicalMethod.name}</td>
                        <td>${m.certificates}</td>
                        <td>${m.languages}</td>
                        <td>${m.experience}</td>
                        <td>${m.schedules}</td>
                        <td>
                            <a href="./mentorDetail.html?id=${m.id}">Ver Detalles</a>
                        </td>
                    </tr>`
                )
                .join("");
        } catch (err) {
            console.error(err);
            tbody.innerHTML = "<tr><td colspan='9'>Error al cargar mentores</td></tr>";
        }
    }

    loadMentor();
}