import { User } from './user';
import { InsuranceCarrier } from './insurance-carrier';

export class Patient extends User {
    NHC: string;
    insuranceCarrier: InsuranceCarrier[];
}

