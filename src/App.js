import { useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  signOutUser,
  createUserDocumentfromAuth,
} from "./utils/firebase/firebase.js";
import Home from "./Routes/Home/Home";
import Navigation from "./Routes/Navigation/Navigation";
import Authentication from "./Routes/Authentication/Authentication";
import Checkout from "./Routes/Checkout/Checkout";
import { Route, Routes } from "react-router-dom";
import Shop from "./Routes/Shop/Shop";
import { setCurrentUser } from "./store/User/UserAction.js";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unSubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentfromAuth(user);
      }
      dispatch(setCurrentUser(user));
      //signOutUser();
    });
    return unSubscribe;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/shop/*" element={<Shop />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};
export default App;
