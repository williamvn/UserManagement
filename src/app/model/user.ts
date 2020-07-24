import { Address } from "./Address";

type gender = "M" | "F";
export class User {
    _id: string;
    name: string;
    lastName: string;
    secondLastName: string;
    gender: gender;
    birthDay: Date;
    documentationId: string;
    address: Address;
}
