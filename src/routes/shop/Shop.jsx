import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categoriesPreview";

import './shop.style.scss';

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      {/* <Route path=':category' element={<Category />} /> */}
    </Routes>
  );
};

export default Shop;
