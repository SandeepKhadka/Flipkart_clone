import * as actionType from "../constants//productsConstants";

const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case actionType.GET_CART_PRODUCT:
      const item = action.payload;
      const exists = state.cartItems.find((product) => product.id === item.id);
      if (exists) {
        return {
          ...state,
          cartItems: state.cartItems.map((data) =>
            data.product === exists.product ? data : item
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case actionType.GET_REMOVE_CART_PRODUCT:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (product) => product.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
