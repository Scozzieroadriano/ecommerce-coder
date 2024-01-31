import { Router } from 'express';
import verifyToken from '../middlewares/verify.token.js';
import TicketController from '../controllers/ticket.controller.js';
const ticketController = new TicketController()
const router = Router();

router.post('/purchase', verifyToken, ticketController.generateTicket)

export default router;





