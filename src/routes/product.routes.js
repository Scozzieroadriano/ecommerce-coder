import { Router } from "express";
import ProductController from "../controllers/product.controller.js";
import isAdmin from "../middlewares/isAdmin.js";
const router = Router();
const productController = new ProductController();

router.get("/",productController.getAll);
router.post("/createmocks",productController.createProductsMock);
router.get("/getmocks",productController.getProductsMock);
router.get("/:id",productController.getById);
router.post("/",isAdmin,productController.create);
router.put("/:id",isAdmin,productController.update);
router.delete("/:id",isAdmin,productController.delete);
export default router;