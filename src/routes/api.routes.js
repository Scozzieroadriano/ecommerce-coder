import { Router } from "express";
import userRoutes from "./user.routes.js";

export default class ApiRoutes {
    constructor() {
        this.router = Router();
        this.initRoutes();
    }
    initRoutes() {
        this.router.use('/users', userRoutes);
    }
    getRouter() {
        return this.router;
    }
}



