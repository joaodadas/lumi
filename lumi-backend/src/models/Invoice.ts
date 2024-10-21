// backend/src/models/Invoice.ts
export class Invoice {
  clientNumber: string;
  referenceMonth: string;
  energyConsumed: number;
  energyConsumedValue: number;
  energySCEEE: number;
  energySCEEValue: number;
  compensatedEnergy: number;
  compensatedEnergyValue: number;
  publicLightingValue: number;
  totalEnergyConsumption: number;
  totalValueWithoutGD: number;
  gdSavings: number;

  constructor(
    clientNumber: string,
    referenceMonth: string,
    energyConsumed: number,
    energyConsumedValue: number,
    energySCEEE: number,
    energySCEEValue: number,
    compensatedEnergy: number,
    compensatedEnergyValue: number,
    publicLightingValue: number
  ) {
    this.clientNumber = clientNumber;
    this.referenceMonth = referenceMonth;
    this.energyConsumed = energyConsumed;
    this.energyConsumedValue = energyConsumedValue;
    this.energySCEEE = energySCEEE;
    this.energySCEEValue = energySCEEValue;
    this.compensatedEnergy = compensatedEnergy;
    this.compensatedEnergyValue = compensatedEnergyValue;
    this.publicLightingValue = publicLightingValue;

    // Calculating aggregated values
    this.totalEnergyConsumption = energyConsumed + energySCEEE;
    this.totalValueWithoutGD =
      energyConsumedValue + energySCEEValue + publicLightingValue;
    this.gdSavings = compensatedEnergyValue;
  }
}
