import { UserService } from "../../services/UserService.js";

export async function renderLogin(container) {
    const html = await fetch("./interfaces/login/login.html").then((res) => res.text());
    container.innerHTML = html;

    const userService = new UserService();
    const form = document.getElementById("login-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        try {
            await userService.authenticateUser(email, password);
            alert("Autenticación exitosa");
        } catch (err) {
            alert("Error de autenticación: " + err.message);
        }
    });
}