import { Request, Response } from 'express';
import { InvoiceService } from '../application/InvoiceService';

export class InvoiceController {
  private service: InvoiceService;

  constructor() {
    this.service = new InvoiceService();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const invoice = await this.service.createInvoice(req.body);
      res.status(201).json(invoice);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create invoice' });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const invoices = await this.service.getAllInvoices();
      res.status(200).json(invoices);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve invoices' });
    }
  }
}
