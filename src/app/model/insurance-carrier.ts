type InsuranceType = "Salud" | "Familiar" | "Dental";

export interface InsuranceCarrier {
    name: string;
    type: InsuranceType;
    cardNumber: string;
}