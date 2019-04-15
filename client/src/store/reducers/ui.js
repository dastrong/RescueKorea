import { SET_LISTINGS_LOADING } from "../actionTypes";

const initialState = {
  isListingsLoading: true,
};

export default (state = initialState, action) => {
  const { type, bool } = action;
  switch (type) {
    case SET_LISTINGS_LOADING:
      return { ...state, isListingsLoading: bool };
    default:
      return state;
  }
};
