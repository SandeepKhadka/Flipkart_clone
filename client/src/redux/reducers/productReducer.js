import * as actionType from "../constants/productsConstants";

const initialState = {
  products: [],
  sortedProducts: [],
  error: null,
};

export const getProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        sortedProducts: [], // Clear sortedProducts when fetching unsorted products
        error: null,
      };
    case actionType.GET_PRODUCTS_SORT_SUCCESS:
      return {
        ...state,
        sortedProducts: action.payload,
        error: null,
      };
    case actionType.GET_PRODUCTS_SORT_FAIL:
    case actionType.GET_PRODUCTS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getProductDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case actionType.GET_PRODUCT_DETAILS:
      return { loading: "true" };
    case actionType.GET_PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case actionType.GET_PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case actionType.GET_PRODUCT_DETAILS_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const getFilteredCategoryReducer = (state = { filter: [] }, action) => {
  switch (action.type) {
    case actionType.GET_FILTERED_CATEGORY_PRODUCT:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

// export const sortProductsReducer = (state = { products: [] }, action) => {
//   switch (action.type) {
//     case actionType.GET_PRODUCTS_SORT_SUCCESS:
//       return { products: action.payload };
//     case actionType.GET_PRODUCTS_SORT_FAIL:
//       return { error: action.payload };
//     default:
//       return state;
//   }
// };
