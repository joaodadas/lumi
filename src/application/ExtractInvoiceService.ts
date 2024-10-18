import { PdfInvoiceExtractor } from '../extractors/PdfInvoiceExtractor';
import { Invoice } from '../models/Invoice';
import { InvoiceRepository } from '../repositories/InvoiceRepository';

export class ExtractInvoiceService {
  private extractor: PdfInvoiceExtractor;
  private repository: InvoiceRepository;

  constructor() {
    this.extractor = new PdfInvoiceExtractor();
    this.repository = new InvoiceRepository();
  }

  async extractAndSave(filePath: string, pdfBuffer: Buffer): Promise<Invoice> {
    const invoice = await this.extractor.extract(filePath);
    await this.repository.save(invoice, pdfBuffer);
    return invoice;
  }

  async getInvoiceSummary(
    clientNumber: string,
    referenceMonth: string
  ): Promise<Invoice | null> {
    return await this.repository.findByClientAndMonth(
      clientNumber,
      referenceMonth
    );
  }

  async getAllInvoices(): Promise<Invoice[]> {
    return await this.repository.findAll();
  }

  async getInvoicePdf(id: number): Promise<Buffer | null> {
    return await this.repository.findPdfById(id);
  }
}
