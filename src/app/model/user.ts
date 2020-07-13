import { Address } from 'cluster';

type gender = "M"|"F";
export class User {
    name: string;
    firstName: string;
    lastName: string;
    gender: gender;
    birthDay: Date;
    docId:string;
    address: Address;
}
