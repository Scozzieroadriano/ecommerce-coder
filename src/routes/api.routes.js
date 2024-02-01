import { Router } from "express";
import userRoutes from "./user.routes.js";
import productRoutes from "./product.routes.js";
import cartRoutes from "./cart.routes.js";
import sessionRoutes from "./session.routes.js";
import ticketRoutes from "./ticket.routes.js";
import viewRoutes from "./views.routes.js";
export default class ApiRoutes {
    constructor() {
        this.router = Router();
        this.initRoutes();
    }
    initRoutes() {
        this.router.use('/api/users', userRoutes);
        this.router.use('/api/products', productRoutes);
        this.router.use('/api/carts', cartRoutes);
        this.router.use('/api/cart', ticketRoutes);
        this.router.use('/api/session', sessionRoutes);
        this.router.use('/', viewRoutes);
    }
    getRouter() {
        return this.router;
    }
}



