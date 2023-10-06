import axios from "axios";
import * as actionType from "../constants/productsConstants";

const URL = "http://localhost:8000";

export const addToCart = (id, quantity) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/product/${id}`);
    dispatch({
      type: actionType.GET_CART_PRODUCT,
      payload: { ...data, quantity },
    });
  } catch (error) {
    dispatch({
      type: actionType.GET_CART_PRODUCT_FAIL,
      payload: error.message,
    });
  }
};

export const removeCart = (id) => (dispatch) => {
  dispatch({ type: actionType.GET_REMOVE_CART_PRODUCT, payload: id });
};
