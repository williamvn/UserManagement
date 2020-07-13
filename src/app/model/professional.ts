import { User } from './user';

type ProfessionalType = "Médico" | "Enferemero" | "Adminsitrativo";
export class Professional extends User{
    NoCollegiate: string;
    type: ProfessionalType;
}