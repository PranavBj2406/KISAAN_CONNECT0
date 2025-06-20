import { createContext, useContext, useState } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  
// Add cart functions here
const addToCart = (item) => {
    setCartItems((prevItems) => {
        const existingItem = prevItems.find((i) => i.id === item.id);
        if (existingItem) {
            return prevItems.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            );
        }
        return [...prevItems, { ...item, quantity: 1 }];
    });
};

const removeFromCart = (itemId) => {
    setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
    );
};

const clearCart = () => {
    setCartItems([]);
};
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, orders, setOrders }}>
      {children}
    </CartContext.Provider>
  );
};