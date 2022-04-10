import "./Category.scss";
import { CategoriesContext } from "../../Context/CategoriesContext";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useContext(CategoriesContext);
  console.log(categoriesMap, "await");
  const [products, setProducts] = useState();

  useEffect(() => {
    setProducts(categoriesMap.categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <div className="category-container">
      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
};
export default Category;
