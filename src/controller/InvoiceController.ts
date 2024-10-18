import { Request, Response } from 'express';
import { ExtractInvoiceService } from '../application/ExtractInvoiceService';
import fs from 'fs';

export class InvoiceController {
  private service: ExtractInvoiceService;

  constructor() {
    this.service = new ExtractInvoiceService();
  }

  async uploadInvoices(req: Request, res: Response): Promise<void> {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        res.status(400).json({ error: 'No files were uploaded.' });
        return;
      }

      const invoices = [];
      for (const file of files) {
        const pdfBuffer = fs.readFileSync(file.path);
        const invoice = await this.service.extractAndSave(file.path, pdfBuffer);
        invoices.push(invoice);
      }

      res.status(201).json(invoices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getInvoiceSummary(req: Request, res: Response): Promise<void> {
    try {
      const { clientNumber, referenceMonth } = req.query;
      const invoice = await this.service.getInvoiceSummary(
        clientNumber as string,
        referenceMonth as string
      );
      res.status(200).json(invoice);
    } catch (error) {
      res.status(404).json({ error: 'Invoice not found.' });
    }
  }

  async getInvoicePdf(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const pdfBuffer = await this.service.getInvoicePdf(parseInt(id));

      if (!pdfBuffer) {
        res.status(404).json({ error: 'PDF not found.' });
        return;
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.send(pdfBuffer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
