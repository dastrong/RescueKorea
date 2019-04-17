import { SET_USER, REMOVE_USER } from "../actionTypes";

export const handleLogin = user => ({
  type: SET_USER,
  user,
});

export const handleLogout = () => ({
  type: REMOVE_USER,
});
