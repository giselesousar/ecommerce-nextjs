"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Product } from "../shared/types/product";

type ContextProps = {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (productId: number) => void;
  isProductInCart: (productId: number) => boolean;
};

const CartContext = createContext({} as ContextProps);

const useCart: () => ContextProps = () => useContext(CartContext);

const CartProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (product: Product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const deleteProduct = (productId: number) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const isProductInCart = (productId: number) => {
    return products.some((product) => product.id === productId);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        isProductInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, useCart };
