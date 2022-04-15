import "./CartDropDown.scss";
import Button from "../Button/button";
import CartItem from "../CartItem/CartItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/Cart/CartSelector";

const CartDropDown = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/checkout");
  };

  const cartItems = useSelector(selectCartItems);

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
