import React, {createContext, useState, useEffect} from 'react'
import Products from '../shop-data.json'

export const ProductContext = createContext({
    products: [],
})

export const ProductProvider = ({children}) => {

    const [products, setProduct] = useState(Products);
    const value = {products}
    return <ProductContext.Provider value={value}> {children}</ProductContext.Provider>
}