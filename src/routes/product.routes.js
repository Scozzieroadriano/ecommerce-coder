import { Router } from "express";
import ProductController from "../controllers/product.controller.js";
import isPremium from "../middlewares/is.premium.js";
const router = Router();
const productController = new ProductController();

router.get("/",productController.getAll);
router.post("/createmocks",productController.createProductsMock);
router.get("/getmocks",productController.getProductsMock);
router.get("/:id",productController.getById);
router.post("/",isPremium,productController.createProduct);
router.put("/:id",isPremium,productController.update);
router.delete("/:id",isPremium,productController.deleteProduct);

export default router;