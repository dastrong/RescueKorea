import { SET_USER, REMOVE_USER } from "../actionTypes";
import { apiRequest } from "../../helpers/api";

export const handleLogin = user => ({
  type: SET_USER,
  user,
});

export const handleLogout = () => ({
  type: REMOVE_USER,
});

// verify that the token is valid
export function verifyUser() {
  return async dispatch => {
    const userObj = JSON.parse(localStorage.getItem("user"));
    if (!userObj) return;
    try {
      await apiRequest("/users/verify", {
        headers: { Authorization: `Bearer ${userObj.token}` },
      });
      dispatch(handleLogin(userObj));
    } catch (err) {
      console.log(err);
      localStorage.clear();
    }
  };
}
