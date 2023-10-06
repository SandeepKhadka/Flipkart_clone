import { createStore, combineReducers, applyMiddleware } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import {
  getFilteredCategoryReducer,
  getProductDetailsReducer,
  getProductsReducer,
} from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";
import {
  getAuthorizedUserReducer,
  getUserReducer,
} from "./reducers/userReducer";
import { getOrdersReducer } from "./reducers/orderReducer";

const middleware = [thunk];

const reducer = combineReducers({
  getProducts: getProductsReducer,
  getOrders: getOrdersReducer,
  getProductDetails: getProductDetailsReducer,
  cart: cartReducer,
  filteredCategory: getFilteredCategoryReducer,
  user: getUserReducer,
  authUser: getAuthorizedUserReducer,
  // sort: sortProductsReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
