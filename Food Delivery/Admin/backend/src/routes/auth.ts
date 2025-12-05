import express, { Router } from "express";
const router: Router = express.Router();
import { registerAdmin, loginAdmin } from "../controller/authController";

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

export default router;
