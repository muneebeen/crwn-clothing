import { createContext, useState, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListener,
  signOutUser,
} from "../utils/firebase/firebase";

// Actual value we want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const SET_USER_TYPE = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};
const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER_TYPE.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };

    default:
      throw new Error(`an unhandled ${type} was thrown in userReducer.`);
  }
};

const INITIAL_STATE = { currentUser: null };

export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);

  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { currentUser } = state;
  //console.log("currentUser", currentUser);

  const setCurrentUser = (user) => {
    dispatch({ type: SET_USER_TYPE.SET_CURRENT_USER, payload: user });
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unSubscribe = onAuthStateChangedListener((user) => {
      setCurrentUser(user);
      //signOutUser();
    });
    return unSubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
