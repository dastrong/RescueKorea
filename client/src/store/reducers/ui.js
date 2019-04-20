import { SET_LISTINGS_LOADING, SET_SERVER_ERROR } from "../actionTypes";

const initialState = {
  isListingsLoading: true,
  isServerError: false,
};

export default (state = initialState, action) => {
  const { type, bool } = action;
  switch (type) {
    case SET_LISTINGS_LOADING:
      return { ...state, isListingsLoading: bool };
    case SET_SERVER_ERROR:
      return { ...state, isServerError: bool };
    default:
      return state;
  }
};
