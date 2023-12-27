import Services from "./class.services.js";
import CartMongoDao from "../daos/mongodb/carts/cart.dao.js";

export default class CartService extends Services {
    constructor() {
        super(new CartMongoDao());
    }

    async addProductToCart(idCart, idProduct) {
        try {
            return await this.dao.addProductToCart(idCart, idProduct);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async removeSingleProduct(idCart, idProduct) {
        try {
            return await this.dao.removeSingleProduct(idCart, idProduct);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async removeAllProducts(idCart) {
        try {
            return await this.dao.removeAllProducts(idCart);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async updateProductQuantity(idCart, idProduct, quantity) {
        try {
            return await this.dao.updateProductQuantity(idCart, idProduct, quantity);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async cartUpdate(idCart, products) {
        try {
            return await this.dao.cartUpdate(idCart, products);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}	