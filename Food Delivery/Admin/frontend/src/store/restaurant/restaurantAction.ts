import { deleteRestaurant, setRestaurants } from "./restaurantSlice";
import api from "../../api/axios";
import type { AppDispatch } from "..";

export const fetchRestaurantsAction = async (dispatch: AppDispatch) => {
  try {
    const res = await api.get("/restaurant/get-restaurants");
    dispatch(setRestaurants(res.data.restaurants));
  } catch (error) {
    console.error("Fetch restaurants error:", error);
  }
};

export const deleteRestaurantAction = async (
  id: string,
  dispatch: AppDispatch
) => {
  try {
    const res = await api.delete(`/restaurant/delete-restaurant/${id}`);
    dispatch(deleteRestaurant(id));
    return res.data;
  } catch (error) {
    console.error("Delete restaurant error:", error);
    throw error;
  }
};
