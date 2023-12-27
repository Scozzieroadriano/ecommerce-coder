import { Router } from "express";
import  verifyToken  from "../middlewares/verify.token.js";
import UserController from "../controllers/user.controller.js";
const router = Router();
const userController = new UserController();

router.get("/",userController.getAll);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", verifyToken, userController.profile);
export default router;