const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-ecommerce'; // Use env variable or fallback

const sampleProducts = [
  {
    name: 'Apple iPhone 15 Pro',
    description: 'The most advanced iPhone yet with titanium design, A17 Pro chip, and professional camera system. Features 6.1-inch Super Retina XDR display and USB-C connectivity.',
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=80',
    category: 'Electronics',
    countInStock: 25,
  },
  {
    name: 'Nike Air Max 270',
    description: 'Iconic running shoes with Max Air unit in the heel for exceptional comfort. Features breathable mesh upper and durable rubber outsole for all-day wear.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
    category: 'Footwear',
    countInStock: 45,
  },
  {
    name: 'MacBook Air M2',
    description: 'Supercharged by M2 chip with 8-core CPU and 8-core GPU. Features 13.6-inch Liquid Retina display, up to 18 hours battery life, and fanless design.',
    price: 1199.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    category: 'Electronics',
    countInStock: 15,
  },
  {
    name: 'Levi\'s 501 Original Jeans',
    description: 'The original blue jean since 1873. Classic straight fit with button fly, made from 100% cotton denim. A timeless wardrobe essential.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&q=80',
    category: 'Clothing',
    countInStock: 60,
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise canceling with dual noise sensor technology. Up to 30-hour battery life with quick charge. Crystal clear hands-free calling.',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
    category: 'Electronics',
    countInStock: 30,
  },
  {
    name: 'Adidas Ultraboost 22',
    description: 'Premium running shoes with responsive BOOST midsole and Primeknit upper. Engineered for energy return and comfort on every stride.',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&q=80',
    category: 'Footwear',
    countInStock: 35,
  },
  {
    name: 'Patagonia Better Sweater Jacket',
    description: 'Classic fleece jacket made from recycled polyester. Features full-zip design, stand-up collar, and zippered handwarmer pockets. Perfect for outdoor adventures.',
    price: 139.99,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=400&q=80',
    category: 'Clothing',
    countInStock: 40,
  },
  {
    name: 'Apple Watch Series 9',
    description: 'Most advanced Apple Watch with S9 chip and Double Tap gesture. Features Always-On Retina display, advanced health monitoring, and all-day battery life.',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=400&q=80',
    category: 'Electronics',
    countInStock: 20,
  },
  {
    name: 'Herschel Little America Backpack',
    description: 'Iconic mountaineering-inspired backpack with signature striped fabric liner. Features padded laptop sleeve, drawstring closure, and magnetic strap closures.',
    price: 109.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80',
    category: 'Bags',
    countInStock: 25,
  },
  {
    name: 'Nintendo Switch OLED',
    description: 'Enhanced gaming console with vibrant 7-inch OLED screen, improved audio, and enhanced kickstand. Includes Joy-Con controllers and dock for TV play.',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=400&q=80',
    category: 'Electronics',
    countInStock: 18,
  },
  {
    name: 'Ray-Ban Aviator Classic',
    description: 'Timeless aviator sunglasses with crystal lenses and gold-tone metal frame. 100% UV protection with iconic teardrop shape that never goes out of style.',
    price: 154.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80',
    category: 'Accessories',
    countInStock: 50,
  },
  {
    name: 'Yeti Rambler Tumbler',
    description: 'Double-wall vacuum insulated tumbler that keeps drinks cold for 24+ hours or hot for 6+ hours. Made with kitchen-grade stainless steel and dishwasher safe.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=400&q=80',
    category: 'Home & Kitchen',
    countInStock: 75,
  },
  {
    name: 'Bose QuietComfort 45',
    description: 'World-class noise cancellation, aware mode, and high-fidelity audio. Lightweight for comfort.',
    price: 329.00,
    image: 'https://images.unsplash.com/photo-1629367494173-c78a56567877?auto=format&fit=crop&w=400&q=80',
    category: 'Electronics',
    countInStock: 22,
  },
  {
    name: 'The North Face Borealis Backpack',
    description: 'Versatile backpack with a padded laptop sleeve and a huge main compartment. FlexVent suspension system.',
    price: 99.00,
    image: 'https://images.unsplash.com/photo-1588851240485-054536939942?auto=format&fit=crop&w=400&q=80',
    category: 'Bags',
    countInStock: 30,
  },
  {
    name: 'Hydro Flask 32 oz Wide Mouth',
    description: 'Keeps beverages cold up to 24 hours and hot up to 12 hours. Durable 18/8 Pro-Grade Stainless Steel construction.',
    price: 44.95,
    image: 'https://images.unsplash.com/photo-1521695782260-9b3b55850935?auto=format&fit=crop&w=400&q=80',
    category: 'Home & Kitchen',
    countInStock: 80,
  },
];

const importData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    await Product.deleteMany({});
    console.log('Existing products removed');

    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted');

    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

importData();
