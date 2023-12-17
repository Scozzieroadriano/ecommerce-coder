import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("Api Routes Users - Vista");
});

export default router;