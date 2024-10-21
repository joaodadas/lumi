import { Router } from 'express';
import { InvoiceController } from '../controller/InvoiceController';

const router = Router();
const invoiceController = new InvoiceController();

router.get('/invoices', (req, res) => invoiceController.listInvoices(req, res));

export default router;
