import React, { createContext, useState, useEffect } from "react";
// import SHOP_DATA from "../shop-data.js";
import { getCategoriesAndDocuments } from "../utils/firebase.utils.js";

export const ProductContext = createContext({
    categoriesMap: {},
});

export const ProductProvider = ({ children }) => {
  const [categoriesMap, setProduct] = useState({});
    //   useEffect(() => {
    //     addCollectionAndDocument("categories", SHOP_DATA);
    //   }, []);
  useEffect(() => {
    const getCatMap = async() => {
    const categoryMap = await getCategoriesAndDocuments();
    console.log(categoryMap)

    setProduct(categoryMap);
    }

    getCatMap();
  }, []);
  const value = { categoriesMap };
  return (
    <ProductContext.Provider value={value}> {children}</ProductContext.Provider>
  );
};
