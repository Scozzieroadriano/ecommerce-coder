import { Router } from "express";
import userRoutes from "./user.routes.js";
import productRoutes from "./product.routes.js";
import cartRoutes from "./cart.routes.js";
import sessionRoutes from "./session.routes.js";
import ticketRoutes from "./ticket.routes.js";
import viewRoutes from "./views.routes.js";
import mailingRoutes from "./mailing.routes.js";
import loggerRoutes from "./log.test.routes.js"
export default class ApiRoutes {
    constructor() {
        this.router = Router();
        this.initRoutes();
    }
    initRoutes() {
        this.router.use('/api/users', userRoutes);
        this.router.use('/api/products', productRoutes);
        this.router.use('/api/carts', cartRoutes);
        this.router.use('/api/ticket', ticketRoutes);
        this.router.use('/api/session', sessionRoutes);
        this.router.use('/', viewRoutes);
        this.router.use('/api/gmail',mailingRoutes);
        this.router.use('/api', loggerRoutes);
    }
    getRouter() {
        return this.router;
    }
}



