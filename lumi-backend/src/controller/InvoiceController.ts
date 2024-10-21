// backend/src/controllers/InvoiceController.ts
import { Request, Response } from 'express';
import { ExtractInvoiceService } from '../application/ExtractInvoiceService';
import fs from 'fs';
import path from 'path';

export class InvoiceController {
  private service: ExtractInvoiceService;

  constructor() {
    this.service = new ExtractInvoiceService();
  }

  async listInvoices(req: Request, res: Response): Promise<void> {
    try {
      const invoicesDirectory = path.join(__dirname, '../../invoices');
      const files = fs
        .readdirSync(invoicesDirectory)
        .filter((file) => file.endsWith('.pdf'));

      const invoices = [];
      for (const file of files) {
        const filePath = path.join(invoicesDirectory, file);
        const invoice = await this.service.extract(filePath);
        invoices.push(invoice);
      }

      res.status(200).json(invoices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
