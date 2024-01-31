import Controller from "./class.controller.js";
import TicketService from "../services/ticket.services.js";
const ticketService = new TicketService();
export default class TicketController extends Controller {
    constructor() {
        super(ticketService);
    }

    generateTicket = async (req, res, next) =>{
        try {
            console.log('HOLA CARAOLA');
            
        } catch (error) {
            next(error.message);
        }
    }
}