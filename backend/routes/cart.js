const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { protect } = require('../middleware/authMiddleware');
const mongoose = require('mongoose');

// Get cart for user
router.get('/', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('cartItems.product');
    if (cart) {
      res.json(cart.cartItems);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add or update item in cart
router.post('/item', protect, async (req, res) => {
  const { productId, qty, name, price, image } = req.body;
  if (!productId || !qty) {
    return res.status(400).json({ message: 'Product ID and quantity are required' });
  }
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, cartItems: [] });
    }
    const existItemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);
    if (existItemIndex >= 0) {
      cart.cartItems[existItemIndex].qty = qty;
    } else {
      const productObjectId = new mongoose.Types.ObjectId(productId);
      cart.cartItems.push({ product: productObjectId, qty, name, price, image });
    }
    await cart.save();
    const populatedCart = await Cart.findOne({ user: req.user._id }).populate('cartItems.product');
    res.json(populatedCart.cartItems);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove item from cart
router.delete('/item/:productId', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== req.params.productId);
    await cart.save();
    res.json(cart.cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
