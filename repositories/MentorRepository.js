export class MentorRepository {
    constructor(){
        this.apiUrl = "http://localhost:3000/api/mentors";
        this.SERVER_URL = "http://localhost:3000";
    }

    normalize(m) {
        return {
            ...m,
            user : {
                ...m.user,
                photoUrl: m.photo ? `${this.SERVER_URL}${m.photo}` : "./assets/default-user.png"
            }
        };
    }

    async getAll(){
        const res = await fetch(this.apiUrl);
        if (!res.ok) throw new Error("Error al obtener mentores");
        //return await res.json();
        const data = await res.json();
        return data.map(m => this.normalize(m));
    }

    async getById(id) {
        const res = await fetch(`${this.apiUrl}/${id}`);
        if (!res.ok) throw new Error("Mentor no encontrado");
        return await res.json();
    }
}