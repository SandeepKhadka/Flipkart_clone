import axios from "axios";
import * as actionType from "../constants/ordersConstants";

const URL = "http://localhost:8000";

export const getOrders = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/getOrders`);
    dispatch({ type: actionType.GET_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actionType.GET_ORDERS_FAIL, payload: error.message });
  }
};
