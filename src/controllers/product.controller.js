import Controller from "./class.controller.js";
import ProductServices from "../services/products/product.services.js";
import { createResponse } from "../utils/utils.js";
import { productionLogger } from "../utils/logger.winston.js";
export default class ProductController extends Controller {
    constructor() {
        super(new ProductServices());
    }
    
    createProductsMock = async (req,res,next) => {
        try {
            const {cant} = req.body;
            const data = await this.service.createProductsMock(cant || 100 );
            if (data) {
                productionLogger.info('Productos mockeados creados correctamente');
                createResponse(res,201,data)}
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

    createProduct = async (req,res,next) => {
        try {
            const data = req.body
            const user = req.user
            const response = await this.service.createProduct(data, user)
            if (response) createResponse(res,200,response);
            return false

        } catch (error) {
            next(error.message);
        }
    }
}