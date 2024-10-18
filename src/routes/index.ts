import { Router } from 'express';
import multer from 'multer';
import { InvoiceController } from '../controller/InvoiceController';

const router = Router();
const upload = multer({ dest: 'invoices/' });
const invoiceController = new InvoiceController();

router.post('/upload', upload.array('files', 10), (req, res) =>
  invoiceController.uploadInvoices(req, res)
); // Allow uploading up to 10 files
router.get('/invoice-summary', (req, res) =>
  invoiceController.getInvoiceSummary(req, res)
);
router.get('/invoice/:id/pdf', (req, res) =>
  invoiceController.getInvoicePdf(req, res)
);

export default router;
