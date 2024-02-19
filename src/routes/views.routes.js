import { Router } from "express";
const router = Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/reset-password", (req, res) => {
  res.render("resetpassword");
});
export default router;