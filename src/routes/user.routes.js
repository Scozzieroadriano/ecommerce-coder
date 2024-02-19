import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import passport from "passport";
import verifyToken from "../middlewares/verify.token.js";
const router = Router();
const userController = new UserController();

router.get("/",userController.getAll);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/reset", userController.resetPassword);
router.post("/new-password",verifyToken, userController.changePassword);

router.get("/oauth2/redirect/accounts.google.com", passport.authenticate('google', { session: false }), userController.googleResponse);

export default router;
