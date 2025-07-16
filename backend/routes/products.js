const express = require('express');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all products with filtering and sorting
router.get('/', async (req, res) => {
  try {
    const { category, sortBy } = req.query;
    let filter = {};
    if (category) {
      filter.category = category;
    }
    let query = Product.find(filter);
    if (sortBy === 'priceAsc') {
      query = query.sort({ price: 1 });
    } else if (sortBy === 'priceDesc') {
      query = query.sort({ price: -1 });
    }
    const products = await query.exec();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new product
router.post('/', protect, admin, async (req, res) => {
  try {
    const { name, description, price, image, category, countInStock } = req.body;
    const product = new Product({
      name,
      description,
      price,
      image,
      category,
      countInStock,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a product
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { name, description, price, image, category, countInStock } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.image = image || product.image;
      product.category = category || product.category;
      product.countInStock = countInStock || product.countInStock;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a product
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
