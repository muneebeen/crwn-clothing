import "./Category.scss";
import { CategoriesContext } from "../../Context/CategoriesContext";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext, useState, useEffect } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { selectCategoryMap } from "../../store/Categories/CategorySelector";

const Category = () => {
  const { category } = useParams();
  // const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap = useSelector(selectCategoryMap);
  console.log(categoriesMap);

  const [products, setProducts] = useState();

  useEffect(() => {
    setProducts(categoriesMap[category]);
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
