import React, { createContext, useState } from 'react';

// Define the cart item structure
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Define the context props
interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>, increaseQuantity?: boolean) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
}

// Create context with default values
export const CartContext = createContext<CartContextProps | undefined>(undefined);

// Define props for the provider
interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Function to add item to cart or update quantity
  const addToCart = (product: Omit<CartItem, 'quantity'>, increaseQuantity: boolean = false) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: increaseQuantity ? item.quantity + 1 : item.quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  
  

  // Function to remove item from cart or decrease quantity
  const removeFromCart = (id: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  // Function to clear the cart
  const clearCart = () => setCart([]);

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
