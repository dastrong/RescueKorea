import { combineReducers } from "redux";
import listings from "./listings";
import user from "./user";
import ui from "./ui";

export default combineReducers({
  listings,
  user,
  ui,
});
