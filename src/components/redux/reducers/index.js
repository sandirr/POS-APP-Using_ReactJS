import { combineReducers } from "redux";
import products from "./Product";
import categories from "./Categories";
import users from "./Users";
import cart from "./Cart";
import histories from "./History";

export default combineReducers({
  products,
  categories,
  users,
  cart,
  histories
});
