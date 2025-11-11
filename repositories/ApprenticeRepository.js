export class ApprenticeRepository {
    constructor(){
        this.apiUrl = "http://localhost:3000/api/apprentices";
    }

    async getAll(){
        const res = await fetch(this.apiUrl);
        if (!res.ok) throw new Error("Error al obtener aprendices");
        return await res.json();
    }

    async getById(id) {
        const res = await fetch(`${this.apiUrl}/${id}`);
        if (!res.ok) throw new Error("Aprendiz no encontrado");
        return await res.json();
    }
}