import { useContext, useState } from "react";
import "./CartIcon.scss";
import { ReactComponent as ShoppingIcon } from "../../Assets/shopping-bag.svg";
import { CartContext } from "../../Context/CartContext";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="cart-icon-container" onClick={toggleCart}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};
export default CartIcon;
