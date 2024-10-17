import { PrismaClient } from '@prisma/client';
import { Invoice } from '../models/Invoice';

const prisma = new PrismaClient();

export class InvoiceRepository {
  async save(invoice: Invoice): Promise<Invoice> {
    const savedInvoice = await prisma.invoice.create({
      data: {
        clientNumber: invoice.clientNumber,
        referenceMonth: invoice.referenceMonth,
        energyConsumed: invoice.energyConsumed,
        energySCEEWithoutICMS: invoice.energySCEEWithoutICMS,
        totalAmount: invoice.totalAmount,
        compensatedEnergy: invoice.compensatedEnergy,
        publicLightingContribution: invoice.publicLightingContribution,
      },
    });

    return savedInvoice;
  }

  async findAll(): Promise<Invoice[]> {
    return await prisma.invoice.findMany();
  }
}
