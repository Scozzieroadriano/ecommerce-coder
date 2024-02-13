import Controller from "./class.controller.js";
import TicketService from "../services/ticket.services.js";
import { createResponse } from "../utils/utils.js";

const ticketService = new TicketService();
export default class TicketController extends Controller {
    constructor() {
        super(ticketService);
    }

    generateTicket = async (req, res, next) =>{
        try {
            const { cartId } = req.params;    
            const userId = req.user._id.toString();        
            const data = await ticketService.generateTicket(userId, cartId);
            createResponse(res, 200, data)
        } catch (error) {
            next(error.message);
        }
    }

}