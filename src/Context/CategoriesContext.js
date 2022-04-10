import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase";
import ShopData from "../ShopData.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoryContextProvider = ({ children }) => {
  const [categoriesMap, setcategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categories = await getCategoriesAndDocuments();
      setcategoriesMap(categories);
    };
    getCategoriesMap();
  }, []);

  // We will only run it once and then comment it because data is uploaded on the firebase db.
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", ShopData);
  // }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
