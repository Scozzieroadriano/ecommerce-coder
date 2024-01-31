import Services from "./class.services.js";
import TicketMongoDao from "../daos/mongodb/tickets/ticket.dao.js";
import UserService from "./user.services.js";
import CartService from "./cart.services.js";
import ProductService from "./product.services.js";
const userService = new UserService();
const ticketDao = new TicketMongoDao();
const cartService = new CartService();
const productService = new ProductService();

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
            console.log(amountAcc);
            return user 
        } catch (error) {
            throw new Error('Error al crear el ticket');
        }
    }
}