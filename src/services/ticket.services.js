import Services from "./class.services.js";
import TicketMongoDao from "../daos/mongodb/tickets/ticket.dao.js";
import UserService from "./user.services.js";
import CartService from "./cart.services.js";
const userService = new UserService();
const ticketDao = new TicketMongoDao();
const cartService = new CartService();

export default class TicketService extends Services {
    constructor() {
        super(ticketDao);
    }
    async generateTicket(userId) {
        try {
            //const user = await userService.getUser(userId);
            //if(!user) return false;
            //const cart = await cartService.getById(user.cart);
            //if(!cart) return false;

            let amountAcc = 0;
            
        } catch (error) {
            throw new Error('Error al crear el ticket');
        }
    }
}