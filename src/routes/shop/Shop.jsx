import { useContext } from "react";
import { ProductContext } from "../../context/productContext";
import ProductCard from "../../components/product-card/ProductCard";
import './shop.style.scss'

const Shop = () => {
  const {products} = useContext(ProductContext)
  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product}/>
      ))}
    </div>
  );
};

export default Shop;
