import { SET_LISTINGS_LOADING, SET_SERVER_ERROR } from "../actionTypes";

export const setListingsLoading = bool => ({
  type: SET_LISTINGS_LOADING,
  bool,
});

export const setServerError = bool => ({
  type: SET_SERVER_ERROR,
  bool,
});
