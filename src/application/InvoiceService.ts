import { InvoiceRepository } from '../repositories/InvoiceRepository';
import { Invoice } from '../models/Invoice';

export class InvoiceService {
  private repository: InvoiceRepository;

  constructor() {
    this.repository = new InvoiceRepository();
  }

  async createInvoice(data: {
    clientNumber: string;
    referenceMonth: string;
    energyConsumed: number;
    energySCEEWithoutICMS: number;
    totalAmount: number;
    compensatedEnergy: number;
    publicLightingContribution: number;
  }): Promise<Invoice> {
    const invoice = new Invoice(
      data.clientNumber,
      data.referenceMonth,
      data.energyConsumed,
      data.energySCEEWithoutICMS,
      data.totalAmount,
      data.compensatedEnergy,
      data.publicLightingContribution
    );

    return await this.repository.save(invoice);
  }

  async getAllInvoices(): Promise<Invoice[]> {
    return await this.repository.findAll();
  }
}
