import { ApprenticeRepository } from "../repositories/ApprenticeRepository.js";
import { Apprentice } from "../models/apprentice.js";

export class ApprenticeService {
    constructor() {
        this.repo = new ApprenticeRepository();
    }
    
    async listApprentice() {
        const data = await this.repo.getAll();
        return data.map((a) => new Apprentice(a.id, a.certificates, a.languajes, a.degree, a.gender, 
            {id: a.user.id, name: a.user.name, email: a.user.email, role: a.user.role}));
    }
}