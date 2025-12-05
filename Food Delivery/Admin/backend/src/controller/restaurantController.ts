import { Request, Response } from "express";
import Restaurant from "../models/restaurant.model";
import { asyncHandler } from "../utils/asyncHandler";
import mongoose from "mongoose";
import { AuthRequest } from "../config/auth";

export const createRestaurant = async (req: Request, res: Response) => {
  const {
    name,
    description,
    email,
    phone,
    address,
    category,
    openingTime,
    closingTime,
    isOpen,
  } = req.body;

  const files = req.files as Express.Multer.File[];
  const images = files.map((f) => `/uploads/restaurants/${f.filename}`);

  const newRest = new Restaurant({
    name,
    description,
    email,
    phone,
    address,
    category,
    openingTime,
    closingTime,
    images,
    isOpen,
  });

  await newRest.save();
  res.status(201).json({ message: "Restaurant created", restaurant: newRest });
};

export const getRestaurants = async (req: AuthRequest, res: Response) => {
  const userId = req?.user?.id;
  if (userId) {
    const restaurants = await Restaurant.find({});
    return res.status(200).json({
      restaurants,
    });
  }
  return res.status(400).json({
    message: "user not authenticated!!",
  });
};

export const deleteRestaurant = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findByIdAndDelete(id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
