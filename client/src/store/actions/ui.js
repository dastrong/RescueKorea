import { SET_LISTINGS_LOADING, FETCH_LISTINGS } from "../actionTypes";

export const fetchListings = () => ({
  type: FETCH_LISTINGS,
});

export const setListingsLoading = bool => ({
  type: SET_LISTINGS_LOADING,
  bool,
});
