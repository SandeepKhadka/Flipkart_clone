import axios from "axios";
import * as actionType from "../constants/userConstants";

const URL = "http://localhost:8000";

export const getLoggedInUser = (data) => async (dispatch) => {
  dispatch({ type: actionType.isloggedIn, payload: data });
};

export const getLoggedOutUser = () => async (dispatch) => {
  dispatch({ type: actionType.isloggedOut });
};

export const authorizedUser = (token) => async (dispatch) => {
  try {
    const response = await fetch(`${URL}/getUser`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await response.json();
    dispatch({ type: actionType.AUTHORIZED_USER, payload: data });
  } catch (error) {
    dispatch({ type: actionType.UNAUTHORIZED_USER, payload: error.message });
  }
};
