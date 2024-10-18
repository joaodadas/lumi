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

  async extractAndSave(filePath: string): Promise<Invoice> {
    // Extrair dados do PDF
    const invoice = await this.extractor.extract(filePath);

    // Salvar a fatura no repositório
    await this.repository.save(invoice);

    return invoice;
  }

  async getInvoiceSummary(
    clientNumber: string,
    referenceMonth: string
  ): Promise<Invoice | null> {
    const invoice = await this.repository.findByClientAndMonth(
      clientNumber,
      referenceMonth
    );
    if (!invoice) {
      throw new Error('Fatura não encontrada.');
    }
    return invoice;
  }

  async getAllInvoices(): Promise<Invoice[]> {
    return await this.repository.findAll();
  }
}
