import { User } from './user';

type ProfessionalType = "Médico" | "Enfermero" | "Administrativo";
export class Professional extends User{
    noCollegiate: string;
    type: ProfessionalType;
}