import { MentorRepository } from "../repositories/MentorRepository.js";
import { Mentor } from "../models/Mentor.js";

export class MentorService {
    constructor() {
        this.repo = new MentorRepository();
    }

    async listMentor() {
        const data = await this.repo.getAll();
        return data.map((m) => new Mentor(m.id, m.experience, m.schedules, m.languages, m.certificates, 
            {id: m.user.id, name: m.user.name, email: m.user.email, role: m.user.role, photo: m.user.photoUrl},
            {id: m.area.id, name: m.area.name, description: m.area.description},
            {id: m.pedagogicalMethod.id, name: m.pedagogicalMethod.name, description: m.pedagogicalMethod.description}));
    }
}