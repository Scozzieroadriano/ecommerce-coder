import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import passport from "passport";
import verifyToken from "../middlewares/verify.token.js";
const router = Router();
const userController = new UserController();

router.get("/",userController.getAll);
router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/oauth2/redirect/accounts.google.com", passport.authenticate('google', { session: false }), userController.googleResponse);
router.get("/dto",verifyToken, userController.user)
export default router;
