// ============= TYPES =============
export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  pincode?: string;
  coordinates?: {
    type: "Point";
    coordinates: [number, number];
  };
}

export interface IRestaurant {
  _id?: string;
  name: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: IAddress;
  category?: string;
  openingTime?: string;
  closingTime?: string;
  rating?: number;
  isOpen?: boolean;
  images?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

// ============= MOCK DATA =============
// const mockRestaurants: IRestaurant[] = [
//   {
//     _id: "1",
//     name: "Pizza Paradise",
//     description: "Authentic Italian pizzas with fresh ingredients",
//     email: "contact@pizzaparadise.com",
//     phone: "+1 234-567-8900",
//     address: {
//       street: "123 Main Street",
//       city: "New York",
//       state: "NY",
//       pincode: "10001",
//       coordinates: { type: "Point", coordinates: [-73.935242, 40.73061] },
//     },
//     category: "Italian",
//     openingTime: "10:00",
//     closingTime: "23:00",
//     rating: 4.5,
//     isOpen: true,
//     images: [
//       "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
//     ],
//     createdAt: new Date("2024-01-15"),
//   },
//   {
//     _id: "2",
//     name: "Spice & Curry",
//     description: "Traditional Indian cuisine with authentic spices",
//     email: "info@spiceandcurry.com",
//     phone: "+1 234-567-8901",
//     address: {
//       street: "456 Oak Avenue",
//       city: "New York",
//       state: "NY",
//       pincode: "10002",
//       coordinates: { type: "Point", coordinates: [-73.935242, 40.73061] },
//     },
//     category: "Indian",
//     openingTime: "11:00",
//     closingTime: "22:00",
//     rating: 4.8,
//     isOpen: true,
//     images: [
//       "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
//     ],
//     createdAt: new Date("2024-01-20"),
//   },
//   {
//     _id: "3",
//     name: "Burger House",
//     description: "Gourmet burgers and craft beer",
//     email: "hello@burgerhouse.com",
//     phone: "+1 234-567-8902",
//     address: {
//       street: "789 Elm Street",
//       city: "New York",
//       state: "NY",
//       pincode: "10003",
//       coordinates: { type: "Point", coordinates: [-73.935242, 40.73061] },
//     },
//     category: "American",
//     openingTime: "12:00",
//     closingTime: "00:00",
//     rating: 4.2,
//     isOpen: false,
//     images: [
//       "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
//     ],
//     createdAt: new Date("2024-02-01"),
//   },
// ];

export const categories = [
  "Italian",
  "Indian",
  "Chinese",
  "American",
  "Mexican",
  "Japanese",
  "Thai",
  "Mediterranean",
];
