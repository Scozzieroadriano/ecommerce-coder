import { Router } from "express";
import userRoutes from "./user.routes.js";
import productRoutes from "./product.routes.js";
import cartRoutes from "./cart.routes.js";
export default class ApiRoutes {
    constructor() {
        this.router = Router();
        this.initRoutes();
    }
    initRoutes() {
        this.router.use('/users', userRoutes);
        this.router.use('/products', productRoutes)
        this.router.use('/carts', cartRoutes)
    }
    getRouter() {
        return this.router;
    }
}



