import express, { Router } from "express";
import {
  createRestaurant,
  getRestaurants,
  deleteRestaurant,
} from "../controller/restaurantController";
import { isAuthenticated } from "../config/auth";
import { body, param, query } from "express-validator";
import { createUploader } from "../config/multer";
const uploadRestaurant = createUploader({ folder: "restaurants" });

const router: Router = express.Router();

// All admin routes protected
router.use(isAuthenticated);

router.post(
  "/add-restaurant",
  uploadRestaurant.array("images", 10),
  [
    body("name").isString().notEmpty(),
    body("category").optional().isString(),
    body("address.city").optional().isString(),
    body("address.coordinates").optional().isArray(),
  ],
  createRestaurant
);

router.get("/get-restaurants", isAuthenticated, getRestaurants);

router.delete("/delete-restaurant/:id", isAuthenticated, deleteRestaurant);

export default router;
