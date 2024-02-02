import { Router } from 'express';
import verifyToken from '../middlewares/verify.token.js';
import TicketController from '../controllers/ticket.controller.js';
import verifyCart from '../middlewares/verify.cart.js';
const ticketController = new TicketController()
const router = Router();

router.post('/:cartId/purchase', verifyToken, verifyCart, ticketController.generateTicket)

export default router;





