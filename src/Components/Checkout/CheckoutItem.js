import "./CheckoutItem.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/Cart/CartSelector";
import {
  addItemsToCart,
  clearItemFromCart,
  removeItemFromCart,
} from "../../store/Cart/CartAction";

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  const { name, price, imageUrl, quantity } = cartItem;

  const cartItems = useSelector(selectCartItems);

  const addItemHandler = () => dispatch(addItemsToCart(cartItems, cartItem));
  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </span>

      <span className="price">{price}</span>
      <div
        className="remove-button"
        onClick={() => dispatch(clearItemFromCart(cartItems, cartItem))}
      >
        &#10005;
      </div>
    </div>
  );
};
export default CheckoutItem;
