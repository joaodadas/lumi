import fs from 'fs';
import pdf from 'pdf-parse';
import { Invoice } from '../models/Invoice';

export class PdfInvoiceExtractor {
  async extract(filePath: string): Promise<Invoice> {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);

    const content = data.text;
    console.log(content);

    // Updated regular expressions based on actual content
    const clientNumberMatch = content.match(/\n\s*(\d{10})\s+\d+/i); // Matches a line with a 10-digit client number followed by another number (installation number)
    const referenceMonthMatch = content.match(/\n\s*([A-Z]{3}\/\d{4})/i); // Matches the month/year in the format "JAN/2024"

    const energyConsumedMatch = content.match(
      /Energia ElétricakWh\s+(\d+)\s+\S+\s+([\d.,]+)/
    );
    const energySCEEEWithoutICMSMatch = content.match(
      /Energia SCEE s\/ ICMSkWh\s+(\d+)\s+\S+\s+([\d.,]+)/
    );
    const compensatedEnergyMatch = content.match(
      /Energia compensada GD IkWh\s+(\d+)\s+\S+\s*(-?[\d.,]+)/
    );
    const publicLightingMatch = content.match(
      /Contrib Ilum Publica Municipal\s+([\d.,]+)/
    );

    // Logging to debug issues if any field is not matched
    console.log('Client Number Match:', clientNumberMatch);
    console.log('Reference Month Match:', referenceMonthMatch);
    console.log('Energy Consumed Match:', energyConsumedMatch);
    console.log('Energy SCEE Without ICMS Match:', energySCEEEWithoutICMSMatch);
    console.log('Compensated Energy Match:', compensatedEnergyMatch);
    console.log('Public Lighting Match:', publicLightingMatch);

    // Check if any of the matches failed
    if (
      !clientNumberMatch ||
      !referenceMonthMatch ||
      !energyConsumedMatch ||
      !energySCEEEWithoutICMSMatch ||
      !compensatedEnergyMatch ||
      !publicLightingMatch
    ) {
      throw new Error('Error extracting information from PDF.');
    }

    // Create Invoice instance from extracted data
    return new Invoice(
      clientNumberMatch[1],
      referenceMonthMatch[1],
      parseInt(energyConsumedMatch[1]),
      parseFloat(energyConsumedMatch[2].replace(',', '.')),
      parseInt(energySCEEEWithoutICMSMatch[1]),
      parseFloat(energySCEEEWithoutICMSMatch[2].replace(',', '.')),
      parseInt(compensatedEnergyMatch[1]),
      parseFloat(compensatedEnergyMatch[2].replace(',', '.')),
      parseFloat(publicLightingMatch[1].replace(',', '.'))
    );
  }
}
