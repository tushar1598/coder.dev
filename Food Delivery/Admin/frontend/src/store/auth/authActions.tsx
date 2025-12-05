import api from "../../api/axios";
import { loginRequest, loginSuccess, loginFailure } from "./authSlice";

export const loginUser = (formData: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(loginRequest());

      const res = await api.post("/login", formData);
      dispatch(loginSuccess(res.data.token));
      return res.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;
      dispatch(loginFailure(errorMessage));
      throw errorMessage;
    }
  };
};
