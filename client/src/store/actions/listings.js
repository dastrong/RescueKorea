import {
  SET_LISTINGS,
  // CREATE_LISTING,
  // UPDATE_LISTING,
  // DELETE_LISTING,
} from "../actionTypes";
import { apiRequest } from "../../helpers/api";
import { setListingsLoading } from "./ui";

const setListings = listings => ({
  type: SET_LISTINGS,
  listings,
});

// const handleCreateListing = () => ({
//   type: CREATE_LISTING,
// });

// const handleUpdateListing = () => ({
//   type: UPDATE_LISTING,
// });

// const handleDeleteListing = () => ({
//   type: DELETE_LISTING,
// });

export function getListings() {
  return async dispatch => {
    try {
      const listings = await apiRequest("/posts", {});
      dispatch(setListings(listings));
      dispatch(setListingsLoading(false));
    } catch (err) {
      console.log(err);
    }
  };
}

export function createListing() {
  return async dispatch => {
    try {
    } catch (err) {
      console.log(err);
    }
  };
}

export function updateListing() {
  return async dispatch => {
    try {
    } catch (err) {
      console.log(err);
    }
  };
}

export function deleteListing() {
  return async dispatch => {
    try {
    } catch (err) {
      console.log(err);
    }
  };
}
