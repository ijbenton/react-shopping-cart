import { ReactNode, createContext, useContext, useState } from "react";

import Cart from "../components/Cart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type CartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type CartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const CartContext = createContext({} as CartContext);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cart", []);
  const [isOpen, setIsOpen] = useState(false);

  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const openCart = () => setIsOpen(true);

  const closeCart = () => setIsOpen(false);

  const getItemQuantity = (id: number) =>
    cartItems.find((item) => item.id === id)?.quantity ?? 0;

  const increaseCartQuantity = (id: number) =>
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
    });

  const decreaseCartQuantity = (id: number) =>
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });

  const removeFromCart = (id: number) => {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        openCart,
        closeCart,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <Cart isOpen={isOpen} />
    </CartContext.Provider>
  );
};
