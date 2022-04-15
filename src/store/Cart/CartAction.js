import { createAction } from "../../utils/firebase/reducer";
import { CART_ACTION_TYPES } from "./CartReducer";

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

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

export const clearCart = (cartItems, productToClear) => {
  return cartItems.filter((item) => item.id !== productToClear.id);
};

export const addItemsToCart = (cartItems, productToAdd) => {
  const updatedCart = addCartItems(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, updatedCart);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const updatedCart = removeCartItems(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, updatedCart);
};

export const clearItemFromCart = (cartItems, productToClear) => {
  const updatedCart = clearCart(cartItems, productToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, updatedCart);
};
