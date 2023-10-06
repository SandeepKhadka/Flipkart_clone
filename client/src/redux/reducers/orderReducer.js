import * as actionType from "../constants/ordersConstants";

const initialState = {
  orders: [],
};

export const getOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      };
    case actionType.GET_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
