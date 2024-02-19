import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import passport from "passport";
import verifyToken from "../middlewares/verify.token.js";
import isAdmin from "../middlewares/isAdmin.js";
const router = Router();
const userController = new UserController();

router.get("/",userController.getAll);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/reset", userController.resetPassword);
router.post("/new-password",verifyToken, userController.changePassword);
router.post("/premium/:uId",isAdmin , userController.changeRoles)
router.get("/oauth2/redirect/accounts.google.com", passport.authenticate('google', { session: false }), userController.googleResponse);

export default router;
