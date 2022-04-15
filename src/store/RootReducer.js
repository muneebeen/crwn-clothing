import { combineReducers } from "redux";
import { userReducer } from "./User/UserReducer";
import { categoryReducer } from "./Categories/CategoryReducer";
import { cartReducer } from "./Cart/CartReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  cart: cartReducer,
});
