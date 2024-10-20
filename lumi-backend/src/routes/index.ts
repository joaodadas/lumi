import { Router } from 'express';
import multer from 'multer';
import { InvoiceController } from '../controller/InvoiceController';

const router = Router();
const upload = multer({ dest: 'invoices/' });
const invoiceController = new InvoiceController();

router.post('/upload', upload.array('files', 10), (req, res) =>
  invoiceController.uploadInvoice(req, res)
);
router.get('/invoices', (req, res) => invoiceController.getInvoices(req, res));

export default router;
