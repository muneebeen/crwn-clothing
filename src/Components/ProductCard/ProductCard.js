import "./ProductCard.scss";
import Button from "../Button/button";
import { addItemsToCart } from "../../store/Cart/CartAction";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/Cart/CartSelector";

const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const addToCartClickHandler = () =>
    dispatch(addItemsToCart(cartItems, product));
  return (
    <div className="product-card-container">
      <img src={imageUrl} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType={"inverted"} onClick={addToCartClickHandler}>
        Add to Cart
      </Button>
    </div>
  );
};
export default ProductCard;
