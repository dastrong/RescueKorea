import {
  SET_LISTINGS,
  CREATE_LISTING,
  UPDATE_LISTING,
  DELETE_LISTING,
} from "../actionTypes";
import { apiRequest } from "../../helpers/api";
import { setListingsLoading, setServerError } from "./ui";

const setListings = listings => ({
  type: SET_LISTINGS,
  listings,
});

export const createListing = listing => ({
  type: CREATE_LISTING,
  listing,
});

export const updateListing = listing => ({
  type: UPDATE_LISTING,
  listing,
});

export const deleteListing = id => ({
  type: DELETE_LISTING,
  id,
});

export function getListings() {
  return async dispatch => {
    try {
      const listings = await apiRequest("/posts", {});
      dispatch(setListings(listings));
      dispatch(setListingsLoading(false));
    } catch (err) {
      console.log(err);
      dispatch(setListingsLoading(false));
      dispatch(setServerError(true));
    }
  };
}
