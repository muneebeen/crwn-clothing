import "./ProductCard.scss";
import Button from "../Button/button";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;
  const { addItemsToCart } = useContext(CartContext);
  const addToCartClickHandler = () => addItemsToCart(product);
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
