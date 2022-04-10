import { createContext, useState, useEffect } from "react";

const addCartItems = (cartItems, productToAdd) => {
  if (cartItems.length > 0) {
    const existingItem = cartItems.find((item) => item.id === productToAdd.id);
    if (existingItem) {
      return cartItems.map((item) =>
        item.id === productToAdd.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
  }
  const newArr = [...cartItems, { ...productToAdd, quantity: 1 }];
  //   console.log(newArr);

  return newArr;
};

const removeCartItems = (cartItems, productToRemove) => {
  const existingItem = cartItems.find((item) => item.id === productToRemove.id);

  if (existingItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== productToRemove.id);
  }
  return cartItems.map((item) =>
    item.id === productToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};

const clearCart = (cartItems, productToClear) => {
  return cartItems.filter((item) => item.id !== productToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemsToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  total: 0,
});

export const CartContextProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [total, setTotal] = useState(0);

  const addItemsToCart = (productToAdd) => {
    setCartItems(addCartItems(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItems(cartItems, productToRemove));
  };

  const clearItemFromCart = (productToClear) => {
    setCartItems(clearCart(cartItems, productToClear));
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce((a, b) => {
      return a + b.quantity;
    }, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const total = cartItems.reduce((a, b) => {
      return a + b.quantity * b.price;
    }, 0);
    setTotal(total);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemsToCart,
    cartCount,
    setCartCount,
    removeItemFromCart,
    clearItemFromCart,
    total,
    setTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
