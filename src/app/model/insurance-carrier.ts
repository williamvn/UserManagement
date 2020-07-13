type InsuranceType = "Salud" | "Familiar" | "Dental";

export interface InsuranceCarrier {
    name: string;
    type: InsuranceCarrier;
    cardNumber: string;
}