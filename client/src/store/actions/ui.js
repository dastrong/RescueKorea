import { SET_LISTINGS_LOADING } from "../actionTypes";

export const setListingsLoading = bool => ({
  type: SET_LISTINGS_LOADING,
  bool,
});
