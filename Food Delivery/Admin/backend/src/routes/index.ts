import express, { Router } from "express";
const router: Router = express.Router();
import authRoutes from "./auth";
import restaurantRoutes from "./restaurant";

router.use("/", authRoutes);
router.use("/restaurant", restaurantRoutes);

export default router;
