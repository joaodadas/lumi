import { Router } from 'express';
import { InvoiceController } from '../controller/InvoiceController';

const router = Router();
const invoiceController = new InvoiceController();

router.post('/invoices', (req, res) => invoiceController.create(req, res));
router.get('/invoices', (req, res) => invoiceController.getAll(req, res));

export default router;
