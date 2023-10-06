import axios from "axios";
import * as actionType from "../constants/productsConstants";

const URL = "http://localhost:8000";

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/product`);
    dispatch({ type: actionType.GET_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actionType.GET_PRODUCTS_FAIL, payload: error.message });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionType.GET_PRODUCT_DETAILS });
    const { data } = await axios.get(`${URL}/product/${id}`);
    dispatch({ type: actionType.GET_PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionType.GET_PRODUCT_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

export const sortProducts =
  (sort = "", filter = [], maxPrice = "", minPrice = "") =>
  async (dispatch) => {
    try {
      const queryParams = [];

      if (sort) {
        queryParams.push(`sort=${sort}`);
      }

      if (filter) {
        queryParams.push(`filter=${filter}`);
        // console.log(filter)
      }

      if (minPrice) {
        queryParams.push(`minPrice=${minPrice}`);
      }

      if (maxPrice) {
        queryParams.push(`maxPrice=${maxPrice}`);
      }

      const queryString =
        queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

      const url = `${URL}/products${queryString}`;

      const { data } = await axios.get(url);

      dispatch({ type: actionType.GET_PRODUCTS_SORT_SUCCESS, payload: data });
    } catch (error) {
      // Dispatch a failure action with the error message
      dispatch({
        type: actionType.GET_PRODUCTS_SORT_FAIL,
        payload: error.message,
      });
    }
  };

export const filteredCategory =
  ([text, category]) =>
  (dispatch) => {
    dispatch({
      type: actionType.GET_FILTERED_CATEGORY_PRODUCT,
      payload: [text, category],
    });
  };
