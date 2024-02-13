import MongoDao from "../mongo.dao.js";
import { CartModel } from "./cart.model.js";

export default class CartMongoDao extends MongoDao {
    constructor() {
        super(CartModel);
    }

    async addProductToCart(idCart, idProduct) {
        try {
            const cart = await this.model.findById(idCart);

            if (cart) {
                const product = cart.products.findIndex(p => String(p.product._id) === String(idProduct));
    
                if (product !== -1) {
                    cart.products[product].quantity++;
                } else {
                    cart.products.push({ product: idProduct, quantity: 1});
                }
                await cart.save();
                return { message: "Producto agregado al carrito" };
            } else {
                throw new Error("No se encontró el carrito");
            }
        } catch (error) {
            throw error;
        }
    }

    async removeSingleProduct(idCart, idProduct) {
        try {
            const cart = await this.model.findById(idCart);
            if(cart){
                const product = cart.products.findIndex(p => String(p.product._id) === String(idProduct));
                if (product !== -1) {
                    cart.products.pull({ _id: cart.products[product]._id });
                    await cart.save();
                    return { message: "Producto eliminado del carrito" };
                }
            } else {
                throw new Error("No se encontró el carrito");
            }
        } catch (error) {
            throw error;
        }
    }
    async removeAllProducts(idCart) {
        try {
            const cart = await this.model.findById(idCart);
            if(cart){
                cart.products = [];
                await cart.save();
                return { message: "Productos eliminados del carrito" };
            } else {
                throw new Error("No se encontró el carrito");
            }
        } catch (error) {
            throw error;
        }
    }
    async updateProductQuantity(idCart, idProduct, quantity) {
        try {
            const cart = await this.model.findById(idCart);
            if (cart) {
                const product = cart.products.findIndex(p => String(p.product._id) === String(idProduct));
                if (product !== -1) {
                    cart.products[product].quantity = quantity;
                    await cart.save();
                    return { message: "Producto actualizado" };
                } else {
                    throw new Error("No se encontró el producto");
                }
            }else {
                throw new Error("No se encontró el carrito");
            }
        } catch (error) {
            throw error;
        }
    }
    async cartUpdate(idCart, listProducts) {
        try {
            const cart = await this.model.findByIdAndUpdate(idCart,
                 { products: listProducts.map(product => ({ product })) },
                 { new: true, runValidators: true }
                 );
            if (cart) {
                return { message: "Carrito actualizado" };
            } else {
                throw new Error("No se encontró el carrito");
            }
        } catch (error) {
            throw error;
        }
    }	
}