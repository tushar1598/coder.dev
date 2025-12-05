import mongoose, { Document, Schema } from "mongoose";

export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  pincode?: string;
  coordinates?: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
  };
}

export interface IRestaurant extends Document {
  name: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: IAddress;
  category?: string; // e.g., "Pizza", "Indian"
  openingTime?: string; // "10:00"
  closingTime?: string; // "23:00"
  rating?: number;
  isOpen?: boolean;
  images?: string[]; // URLs
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema(
  {
    street: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        default: [0, 0],
      },
    },
  },
  { _id: false }
);

const RestaurantSchema = new Schema<IRestaurant>(
  {
    name: { type: String, required: true, index: true },
    description: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: AddressSchema },
    category: { type: String, index: true },
    openingTime: { type: String },
    closingTime: { type: String },
    rating: { type: Number, default: 0 },
    isOpen: { type: Boolean, default: true },
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

// create 2dsphere index to support geo queries (distance filtering)
RestaurantSchema.index({ "address.coordinates": "2dsphere" });

const Restaurant = mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);

export default Restaurant;
