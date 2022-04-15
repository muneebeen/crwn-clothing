import { createAction } from "../../utils/firebase/reducer";

export const SET_USER_TYPE = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

export const setCurrentUser = (user) =>
  createAction(SET_USER_TYPE.SET_CURRENT_USER, user);
