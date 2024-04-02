import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import passport from "passport";
import verifyTokenPass from "../middlewares/verify.token.pass.js";
import isAdmin from "../middlewares/isAdmin.js";
const router = Router();
const userController = new UserController();

router.get("/",isAdmin,userController.getAllUsers);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/reset", userController.resetPassword);
router.post("/new-password",verifyTokenPass, userController.changePassword);
router.post("/premium/:uId",isAdmin , userController.changeRoles)
router.get("/oauth2/redirect/accounts.google.com", passport.authenticate('google', { session: false }), userController.googleResponse);
router.delete('/delete', isAdmin, userController.deleteUsers);

export default router;
