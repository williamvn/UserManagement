type InsuranceType = "Salud" | "Familiar" | "Dental";

export class InsuranceCarrier {
    name: string;
    type: InsuranceType;
    cardNumber: string;
}