import React, { useState } from "react";
import { Product, ProductContextState } from "../Types/Product";

interface ProviderProps {
  children: React.ReactNode;
}

export const Context = React.createContext<ProductContextState | null>(null);

const ProductProvider: React.FC<ProviderProps> = ({ children }) => {
  // Estado para almacenar la lista de productos
  const [products, setProducts] = useState<Product[]>([]);

  // Estado para almacenar el número de elementos en el carrito
  const [cartNumber, setCartNumber] = useState<number>(0);

  // Estado para almacenar el término de búsqueda
  const [search, setSearch] = useState<string>("");

  // Agregar un producto al carrito
  const addProductToCart = (product: Product) => {
    setProducts((prevProducts) => {
      const existingProduct = prevProducts.find(
        (p) => p.itemId === product.itemId
      );

      if (existingProduct) {
        return prevProducts.map((p) =>
          p.itemId === product.itemId ? { ...p, amount: p.amount + 1 } : p
        );
      } else {
        return [...prevProducts, { ...product, amount: 1 }];
      }
    });
    setCartNumber((prevNumber) => prevNumber + 1);
  };

  // Calcular el total del carrito
  const cartTotal = (products: Product[]): number => {
    return products.reduce(
      (total, product) => total + product.price * product.amount,
      0
    );
  };

  const removeProductFromCart = (productId: number) => {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.itemId !== productId)
    );
  };

  const itemsInCart = (): number => {
    return products.reduce((total, product) => total + product.amount, 0);
  };

  const updateAmount = (productId: number, newAmount: number) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.itemId === productId
          ? { ...product, amount: newAmount }
          : product
      )
    );
  };

  const itemSearch = (searchTerm: string) => {
    setSearch(searchTerm);
  };

  const removeAllProductsFromCart = () => {
    setProducts([]);
    setCartNumber(0); // Assuming you want to reset the cart number as well
  };

  return (
    <Context.Provider
      value={{
        products,
        addProductToCart,
        removeProductFromCart,
        itemsInCart,
        cartTotal,
        cartNumber,
        updateAmount,
        itemSearch,
        search,
        removeAllProductsFromCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ProductProvider;
