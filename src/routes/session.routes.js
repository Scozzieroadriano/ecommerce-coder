import { Router } from "express";
import  verifyToken  from "../middlewares/verify.token.js";
import UserController from "../controllers/user.controller.js";
import passport from "passport";

const router = Router();
const userController = new UserController();

router.get("/current", verifyToken, userController.profile);

router.get("/oauth2/redirect/accounts.google.com", passport.authenticate('google', { session: false }), userController.googleResponse);
export default router;