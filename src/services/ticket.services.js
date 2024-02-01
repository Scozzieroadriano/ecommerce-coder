import Services from "./class.services.js";
import TicketMongoDao from "../daos/mongodb/tickets/ticket.dao.js";
import UserService from "./user.services.js";
import CartService from "./cart.services.js";
const userService = new UserService();
const ticketDao = new TicketMongoDao();
const cartService = new CartService();
import { v4 as uuidv4 } from "uuid";

export default class TicketService extends Services {
    constructor() {
        super(ticketDao);
    }
    async generateTicket(userId) {
        try {
            let amountAcc = 0;
            const user = await userService.getUser(userId);            
            if(!user) return false;
            const cart = await cartService.getById(user.cart);
            if(!cart) return false;
            for (const p of cart.products) {
                const idProduct = p.product._id.toString()
                if (p.product.stock >= p.quantity){
                    const amount = p.quantity * p.product.price
                    amountAcc += amount
                }
            }
            const ticket = await ticketDao.create({
                code : uuidv4(),
                purchase_datetime: new Date().toLocaleString(),
                amount: amountAcc,
                purcharser: user.email
            });

            cart.products = []
            cart.save();

            return ticket 
        } catch (error) {
            throw new Error('Error al crear el ticket');
        }
    }
}