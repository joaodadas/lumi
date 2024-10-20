import { Request, Response } from 'express';
import { ExtractInvoiceService } from '../application/ExtractInvoiceService';
import { InvoiceRepository } from '../repositories/InvoiceRepository';

export class InvoiceController {
  private service: ExtractInvoiceService;
  private repository: InvoiceRepository;

  constructor() {
    this.service = new ExtractInvoiceService();
    this.repository = new InvoiceRepository();
  }

  async uploadInvoice(req: Request, res: Response): Promise<void> {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        res.status(400).json({ error: 'No files were uploaded.' });
        return;
      }

      const invoices = [];
      for (const file of files) {
        const invoice = await this.service.extract(file.path);
        this.repository.save(invoice);
        invoices.push(invoice);
      }

      res.status(201).json(invoices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getInvoices(req: Request, res: Response): void {
    const invoices = this.repository.findAll();
    res.status(200).json(invoices);
  }
}
