import * as actionType from "../constants/userConstants";

export const getUserReducer = (
  state = { user: {}, isloggedIn: false },
  action
) => {
  switch (action.type) {
    case actionType.isloggedIn:
      return { ...state, user: action.payload, isloggedIn: true }; // Use 'state.user' to access the user property
    case actionType.isloggedOut:
      return { user: "", isloggedIn: false };
    default:
      return state;
  }
};

export const getAuthorizedUserReducer = (
  state = { user: {}, isloggedIn: false },
  action
) => {
  switch (action.type) {
    case actionType.AUTHORIZED_USER:
      return { ...state, user: action.payload, isloggedIn: true }; // Use 'state.user' to access the user property
    case actionType.UNAUTHORIZED_USER:
      return { user: "", isloggedIn: false };
    default:
      return state;
  }
};
