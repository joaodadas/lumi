import { PdfInvoiceExtractor } from '../extractors/PdfInvoiceExtractor';
import { Invoice } from '../models/Invoice';

export class ExtractInvoiceService {
  private extractor: PdfInvoiceExtractor;

  constructor() {
    this.extractor = new PdfInvoiceExtractor();
  }

  async extract(filePath: string): Promise<Invoice> {
    return await this.extractor.extract(filePath);
  }
}
