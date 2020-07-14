import { Address } from "./Address";

type gender = "M" | "F";
export class User {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    gender: gender;
    birthDay: Date;
    docId: string;
    address: Address;
}
