import { SET_LISTINGS } from "../actionTypes";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LISTINGS:
      return action.listings;
    default:
      return state;
  }
};
