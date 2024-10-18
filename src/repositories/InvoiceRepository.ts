import { PrismaClient } from '@prisma/client';
import { Invoice } from '../models/Invoice';

const prisma = new PrismaClient();

export class InvoiceRepository {
  async findAll(): Promise<Invoice[]> {
    const results = await prisma.invoice.findMany();
    return results.map(
      (result) =>
        new Invoice(
          result.clientNumber,
          result.referenceMonth,
          result.energyConsumed,
          result.energyConsumedValue,
          result.energySCEEE,
          result.energySCEEValue,
          result.compensatedEnergy,
          result.compensatedEnergyValue,
          result.publicLightingValue
        )
    );
  }
  async save(invoice: Invoice, pdfBuffer?: Buffer): Promise<void> {
    await prisma.invoice.create({
      data: {
        clientNumber: invoice.clientNumber,
        referenceMonth: invoice.referenceMonth,
        energyConsumed: invoice.energyConsumed,
        energyConsumedValue: invoice.energyConsumedValue,
        energySCEEE: invoice.energySCEEE,
        energySCEEValue: invoice.energySCEEValue,
        compensatedEnergy: invoice.compensatedEnergy,
        compensatedEnergyValue: invoice.compensatedEnergyValue,
        publicLightingValue: invoice.publicLightingValue,
        totalEnergyConsumption: invoice.totalEnergyConsumption,
        totalValueWithoutGD: invoice.totalValueWithoutGD,
        gdSavings: invoice.gdSavings,
        pdfFile: pdfBuffer ? pdfBuffer : undefined,
      },
    });
  }
  async findByClientAndMonth(
    clientNumber: string,
    referenceMonth: string
  ): Promise<Invoice | null> {
    const result = await prisma.invoice.findFirst({
      where: { clientNumber, referenceMonth },
    });

    if (!result) return null;

    return new Invoice(
      result.clientNumber,
      result.referenceMonth,
      result.energyConsumed,
      result.energyConsumedValue,
      result.energySCEEE,
      result.energySCEEValue,
      result.compensatedEnergy,
      result.compensatedEnergyValue,
      result.publicLightingValue
    );
  }

  async findPdfById(id: number): Promise<Buffer | null> {
    const result = await prisma.invoice.findUnique({
      where: { id },
      select: { pdfFile: true },
    });

    return result?.pdfFile || null;
  }
}
