import {
  SET_LISTINGS,
  CREATE_LISTING,
  UPDATE_LISTING,
  DELETE_LISTING,
} from "../actionTypes";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LISTINGS:
      return action.listings;
    case CREATE_LISTING:
      return [...state, action.listing];
    case UPDATE_LISTING:
      return state.map(listing =>
        listing._id === action.listing._id ? action.listing : listing
      );
    case DELETE_LISTING:
      return state.filter(listing => listing._id !== action.id);
    default:
      return state;
  }
};
