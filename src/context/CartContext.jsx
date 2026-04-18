import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

/**
 * Custom hook to consume the CartContext.
 * @returns {Object} The cart state and management methods.
 */
export const useCart = () => useContext(CartContext);

/**
 * Provides shopping cart state and methods to the application tree.
 * Handles adding, removing, and updating items, as well as persisting 
 * the cart data to localStorage.
 *
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Child components requiring cart context.
 * @returns {JSX.Element} The CartProvider component.
 */
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('elavate_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('elavate_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  /**
   * Adds a product to the cart or increments its quantity if it already exists 
   * with the exact same size. Automatically opens the cart UI.
   */
  const clearCart = () => {
    setCartItems([]);
  };
  const addToCart = (product, size) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id && item.selectedSize === size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, selectedSize: size, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  /**
   * Removes a specific product and size variant entirely from the cart.
   */
  const removeFromCart = (productId, size) => {
    setCartItems(prev => prev.filter(item => !(item.id === productId && item.selectedSize === size)));
  };

  /**
   * Updates the quantity of a specific cart item. 
   * Safely prevents the quantity from dropping below 1.
   */
  const updateQuantity = (productId, size, change) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === productId && item.selectedSize === size) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  /**
   * Toggles the visibility state of the cart UI (e.g., sliding drawer or modal).
   */
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart, 
      isCartOpen, 
      toggleCart, 
      cartTotal, 
      cartCount 
    }}>
      {children}
    </CartContext.Provider>
  );
};