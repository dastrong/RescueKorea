import { SET_USER, REMOVE_USER } from "../actionTypes";

const initialState = {
  isAuthenticated: null,
  user: {},
};

export default (state = initialState, action) => {
  const { type, user } = action;
  switch (type) {
    case SET_USER:
      return { isAuthenticated: true, user };
    case REMOVE_USER:
      return { isAuthenticated: false, user: {} };
    default:
      return state;
  }
};
