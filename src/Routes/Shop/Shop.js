// import SHOP_DATA from "../../ShopData";
import { useEffect } from "react";
// import { CategoriesContext } from "../../Context/CategoriesContext";
// import ProductCard from "../../Components/ProductCard/ProductCard";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import CategoriesPreview from "../CategoriesPreview/CategoriesPreview";
import Category from "../Category/Category";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase";
import "./Shop.scss";
import { setCategoryMap } from "../../store/Categories/CategoryAction";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categories = await getCategoriesAndDocuments();
      console.log(categories);
      dispatch(setCategoryMap(categories));
    };
    getCategoriesMap();
  }, []);

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
