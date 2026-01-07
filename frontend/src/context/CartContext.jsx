// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();

  const cartKey = user ? `cart_${user._id}` : 'cart_guest';
  const [cart, setCart] = useState([]);

  // 🔹 Load cart when user changes
  useEffect(() => {
    const storedCart = localStorage.getItem(cartKey);

    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error('Error parsing cart data:', error);
        localStorage.removeItem(cartKey);
        setCart([]);
      }
    } else {
      setCart([]);
    }
  }, [cartKey]);

  // 🔹 Save cart helper
  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem(cartKey, JSON.stringify(newCart));
  };

  const addToCart = (product, quantity = 1) => {
    const existing = cart.find(item => item._id === product._id);
    let newCart;

    if (existing) {
      newCart = cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity }];
    }

    saveCart(newCart);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    const newCart = cart.map(item =>
      item._id === id ? { ...item, quantity } : item
    );
    saveCart(newCart);
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter(item => item._id !== id);
    saveCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(cartKey);
  };

  const getCartTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getCartCount = () =>
    cart.reduce((count, item) => count + item.quantity, 0);

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    total: getCartTotal(),
    count: getCartCount(),
    isEmpty: cart.length === 0,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
