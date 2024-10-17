export class Invoice {
  id: number;
  clientNumber: string;
  referenceMonth: string;
  energyConsumed: number;
  energySCEEWithoutICMS: number;
  totalAmount: number;
  compensatedEnergy: number;
  publicLightingContribution: number;

  constructor(
    clientNumber: string,
    referenceMonth: string,
    energyConsumed: number,
    energySCEEWithoutICMS: number,
    totalAmount: number,
    compensatedEnergy: number,
    publicLightingContribution: number
  ) {
    this.clientNumber = clientNumber;
    this.referenceMonth = referenceMonth;
    this.energyConsumed = energyConsumed;
    this.energySCEEWithoutICMS = energySCEEWithoutICMS;
    this.totalAmount = totalAmount;
    this.compensatedEnergy = compensatedEnergy;
    this.publicLightingContribution = publicLightingContribution;
  }
}
