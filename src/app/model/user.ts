import { Address } from "./Address";

type gender = "M" | "F";
export class User {
    id: number;
    name: string;
    lastName: string;
    secondLastName: string;
    gender: gender;
    birthDay: Date;
    documentationId: string;
    address: Address;
}
