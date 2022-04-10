// import SHOP_DATA from "../../ShopData";
// import { Fragment, useContext } from "react";
// import { CategoriesContext } from "../../Context/CategoriesContext";
// import ProductCard from "../../Components/ProductCard/ProductCard";
import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../CategoriesPreview/CategoriesPreview";
import Category from "../Category/Category";
import "./Shop.scss";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />}></Route>
      <Route path=":category" element={<Category />}></Route>
    </Routes>
  );

  // const { categoriesMap } = useContext(CategoriesContext);
  // return (
  //   <>
  //     {Object.keys(categoriesMap).map((title) => (
  //       <Fragment key={title}>
  //         <h2>{title}</h2>
  //         <div className="products-container">
  //           {categoriesMap[title]
  //             .filter((item, index) => index < 4)
  //             .map((product) => (
  //               <ProductCard key={product.id} product={product}></ProductCard>
  //             ))}
  //         </div>
  //       </Fragment>
  //     ))}
  //   </>
  // );
};

export default Shop;
