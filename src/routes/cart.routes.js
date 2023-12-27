import { Router } from "express";
import CartController from "../controllers/cart.controller.js";
const router = Router();
const cartController = new CartController();

router.post('/', cartController.create);
router.get('/', cartController.getAll);
router.get("/:id", cartController.getById);
router.post('/:id/products/:pId', cartController.addProductToCart);

router.delete('/:id/products/:pId', cartController.removeSingleProduct);
router.delete('/:id', cartController.delete);
router.delete('/:id/products', cartController.removeAllProducts);
router.put("/:id/products/:pId", cartController.updateProductQuantity)
router.put('/:id', cartController.cartUpdate);

export default router;