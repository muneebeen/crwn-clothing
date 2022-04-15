import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/Cart/CartSelector";
import { setIsCartOpen } from "../../store/Cart/CartAction";

import "./CartIcon.scss";
import { ReactComponent as ShoppingIcon } from "../../Assets/shopping-bag.svg";

const CartIcon = () => {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);
  const toggleCart = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  };

  return (
    <div className="cart-icon-container" onClick={toggleCart}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};
export default CartIcon;
