import { Fragment, useContext } from "react";
import { CategoriesContext } from "../../Context/CategoriesContext";
import ProductCard from "../../Components/ProductCard/ProductCard";
import "./CategoriesPreview.scss";
import { Link } from "react-router-dom";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <div className="product-section">
      {Object.keys(categoriesMap).map((title) => (
        <Fragment key={title}>
          <Link to={`/shop/${title}`}>
            <h2 className="category-title">{title.toUpperCase()}</h2>
          </Link>

          <div className="products-container">
            {categoriesMap[title]
              .filter((item, index) => index < 4)
              .map((product) => (
                <ProductCard key={product.id} product={product}></ProductCard>
              ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default CategoriesPreview;
