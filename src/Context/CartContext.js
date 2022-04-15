import { createContext, useReducer } from "react";
import { createAction } from "../utils/firebase/reducer";

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
  //isCartOpen: false,
  //setIsCartOpen: () => {},
  //cartItems: [],
  addItemsToCart: () => {},
  //cartCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  //total: 0,
});

const cartActionTypes = {
  updateCart: "update cart",
  isCartOpen: "Is Cart Open",
};

const INITIAL_STATE = {
  cartItems: [],
  total: 0,
  cartCount: 0,
  isCartOpen: false,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case cartActionTypes.updateCart:
      return {
        ...state,
        ...payload,
      };
    case cartActionTypes.isCartOpen:
      console.log("I");
      return {
        ...state,
        isCartOpen: payload,
      };

    default:
      return "default";
  }
};

export const CartContextProvider = ({ children }) => {
  const [{ cartItems, total, cartCount, isCartOpen }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  const updateCardReducer = (updatedCart) => {
    const newCartCount = updatedCart.reduce((a, b) => {
      return a + b.quantity;
    }, 0);

    const total = updatedCart.reduce((a, b) => {
      return a + b.quantity * b.price;
    }, 0);

    dispatch({
      type: cartActionTypes.updateCart,
      payload: {
        cartItems: updatedCart,
        total: total,
        cartCount: newCartCount,
      },
    });
  };

  const addItemsToCart = (productToAdd) => {
    const updatedCart = addCartItems(cartItems, productToAdd);
    updateCardReducer(updatedCart);
  };

  const removeItemFromCart = (productToRemove) => {
    const updatedCart = removeCartItems(cartItems, productToRemove);
    updateCardReducer(updatedCart);
  };

  const clearItemFromCart = (productToClear) => {
    const updatedCart = clearCart(cartItems, productToClear);
    updateCardReducer(updatedCart);
  };

  const setIsCartOpen = () => {
    dispatch({
      type: cartActionTypes.isCartOpen,
      payload: !isCartOpen,
    });
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemsToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    total,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
