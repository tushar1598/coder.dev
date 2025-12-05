import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IRestaurant } from "../../components/pages/restaurants/restaurantsTypes";

interface RestaurantState {
  restaurants: IRestaurant[];
}

const initialState: RestaurantState = {
  restaurants: [],
};

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    addRestaurant: (state, action: PayloadAction<IRestaurant>) => {
      state.restaurants.push(action.payload);
    },

    setRestaurants: (state, action: PayloadAction<IRestaurant[]>) => {
      state.restaurants = action.payload;
    },

    deleteRestaurant: (state, action: PayloadAction<string>) => {
      state.restaurants = state.restaurants.filter(
        (r) => r._id !== action.payload
      );
    },
  },
});

export const { addRestaurant, setRestaurants, deleteRestaurant } =
  restaurantSlice.actions;
export default restaurantSlice.reducer;
