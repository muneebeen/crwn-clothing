import { createAction } from "../../utils/firebase/reducer";
import { SET_CATEGORY_TYPE } from "./CategoryReducer";

export const setCategoryMap = (category) => {
  console.log("I am in action");
  return createAction(SET_CATEGORY_TYPE.SET_CURRENT_CATEGORY, category);
};
