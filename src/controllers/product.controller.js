import Controller from "./class.controller.js";
import ProductServices from "../services/product.services.js";
import { createResponse } from "../utils/utils.js";

export default class ProductController extends Controller {
    constructor() {
        super(new ProductServices());
    }
    
    createProductsMock = async (req,res,next) => {
        try {
            const {cant} = req.body;
            const data = await this.service.createProductsMock(cant || 100 );
            createResponse(res,201,data);
        } catch (error) {
            next(error.message);
        }
    }
    getProductsMock = async (req,res,next) => {
        try {
            const data = await this.service.getProductsMock();
            createResponse(res,200,data);
        } catch (error) {
            next(error.message);
        }
    }
}