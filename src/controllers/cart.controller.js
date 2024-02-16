import Controller from "./class.controller.js";
import CartService from "../services/carts/cart.services.js";
import { createResponse } from "../utils/utils.js";
export default class CartController extends Controller {
    constructor() {
        super(new CartService());
    }

    addProductToCart = async (req, res, next) =>{
        try {
            const { cartId, pId } = req.params;
            const data = await this.service.addProductToCart(cartId, pId);
            createResponse(res, 200, data)
        } catch (error) {
            next(error.message);
        }
    }

    removeSingleProduct = async (req, res, next) =>{
        try {
            const { id, pId } = req.params;
            const data = await this.service.removeSingleProduct(id, pId);
            res.status(200).json(data);
        } catch (error) {
            next(error.message);
        }
    }

    removeAllProducts = async (req, res, next) =>{
        try {
            const { id } = req.params;
            const data = await this.service.removeAllProducts(id);
            res.status(200).json(data);
        } catch (error) {
            next(error.message);
        }
    }
    updateProductQuantity = async(req, res, next)=>{
        try {
            const { id, pId } = req.params;
            const { quantity } = req.body;
            const data = await this.service.updateProductQuantity(id, pId, quantity);
            res.status(200).json(data);
        } catch (error) {
            next(error.message);
        }
    }
    cartUpdate = async (req, res, next)=> {
        try {
            const { id } = req.params;
            const { products } = req.body;
            const data = await this.service.cartUpdate(id, products);
            res.status(200).json(data);
        } catch (error) {
            next(error.message);
        }
    }

}	