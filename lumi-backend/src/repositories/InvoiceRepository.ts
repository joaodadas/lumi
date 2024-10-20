import { Invoice } from '../models/Invoice';

export class InvoiceRepository {
  private invoices: Invoice[] = [];

  save(invoice: Invoice): void {
    this.invoices.push(invoice);
  }

  findAll(): Invoice[] {
    return this.invoices;
  }
}
