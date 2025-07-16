import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        setCartItems([]);
        return;
      }
      try {
        const { data } = await axios.get('http://localhost:5010/api/cart', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, [user]);

  const addToCart = async (product, qty = 1) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    try {
      await axios.post('http://localhost:5010/api/cart/item', {
        productId: product._id,
        qty,
        name: product.name,
        price: product.price,
        image: product.image,
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // Update local cart state
      const existItemIndex = cartItems.findIndex(item => item.product === product._id);
      let updatedCart;
      if (existItemIndex >= 0) {
        updatedCart = [...cartItems];
        updatedCart[existItemIndex].qty += qty;
      } else {
        updatedCart = [...cartItems, { ...product, qty }];
      }
      setCartItems(updatedCart);
      alert(`${product.name} added to cart`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart');
    }
  };

  const updateQty = async (productId, qty) => {
    if (!user) {
      alert('Please login to update cart');
      return;
    }
    try {
      await axios.post('http://localhost:5010/api/cart/item', {
        productId,
        qty,
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const updatedCart = cartItems.map(item =>
        item.product === productId ? { ...item, qty } : item
      ).filter(item => item.qty > 0);
      setCartItems(updatedCart);
    } catch (error) {
      console.error('Error updating cart:', error);
      alert('Failed to update cart');
    }
  };

  const removeItem = async (productId) => {
    if (!user) {
      alert('Please login to update cart');
      return;
    }
    try {
      await axios.delete(`http://localhost:5010/api/cart/item/${productId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const updatedCart = cartItems.filter(item => item.product !== productId);
      setCartItems(updatedCart);
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item');
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQty, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
