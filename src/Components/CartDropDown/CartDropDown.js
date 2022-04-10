import "./CartDropDown.scss";
import Button from "../Button/button";
import CartItem from "../CartItem/CartItem";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";

const CartDropDown = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/checkout");
  };
  const { cartItems } = useContext(CartContext);
  return (
    <div className={`cart-dropdown-container`}>
      {cartItems.map((item) => (
        <CartItem key={item.id} cartItem={item} />
      ))}
      <Button onClick={onClickHandler}>To Checkout</Button>
    </div>
  );
};
export default CartDropDown;
