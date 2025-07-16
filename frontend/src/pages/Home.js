import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5010/api/products');
        let filteredProducts = data;

        // Apply category filter
        if (category && category !== '') {
          filteredProducts = filteredProducts.filter(p => p.category === category);
        }

        // Apply sorting
        if (sortBy === 'priceAsc') {
          filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'priceDesc') {
          filteredProducts.sort((a, b) => b.price - a.price);
        }

        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [category, sortBy]);

  const addToCartHandler = (product) => {
    if (!userInfo) {
      alert('Please login to add items to cart');
      return;
    }
    dispatch(addToCart({ product, qty: 1, token: userInfo.token }));
    alert(`${product.name} added to cart`);
  };

  return (
    <div className="container mx-auto px-4 py-6 bg-ash_gray-900 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-hookers_green mb-4">Products</h1>

      {/* Filter + Sort */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-charcoal mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-dark_slate_gray rounded px-3 py-2 text-sm focus:ring-cambridge_blue focus:border-cambridge_blue text-charcoal"
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Footwear">Footwear</option>
            <option value="Clothing">Clothing</option>
            <option value="Bags">Bags</option>
            <option value="Accessories">Accessories</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-charcoal mb-1">Sort by Price</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full border border-dark_slate_gray rounded px-3 py-2 text-sm focus:ring-cambridge_blue focus:border-cambridge_blue text-charcoal"
          >
            <option value="">None</option>
            <option value="priceAsc">Low to High</option>
            <option value="priceDesc">High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-ash_gray-500 border border-dark_slate_gray rounded-xl p-3 shadow-card hover:shadow-hoverCard transition-all flex flex-col group relative"
          >
            {/* Product Image */}
            <div className="w-full aspect-[4/3] bg-ash_gray-300 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x225?text=No+Image';
                }}
              />
            </div>

            {/* Badges */}
            {product.isNew && (
              <span className="absolute top-3 left-3 bg-hookers_green text-ash_gray-900 text-[10px] font-semibold px-2 py-0.5 rounded">
                NEW
              </span>
            )}
            {product.discount && (
              <span className="absolute top-3 right-3 bg-cambridge_blue text-ash_gray-900 text-[10px] font-semibold px-2 py-0.5 rounded">
                {product.discount}% OFF
              </span>
            )}

            {/* Product Info */}
            <h5 className="text-sm font-medium mb-1 text-charcoal line-clamp-2">{product.name}</h5>
            <p className="text-base font-bold text-hookers_green mb-3">${product.price.toFixed(2)}</p>

            {/* Buttons */}
            <div className="mt-auto flex flex-col gap-2">
              <button
                onClick={() => addToCartHandler(product)}
                className="btn-primary text-black font-semibold text-sm py-2 px-4 rounded-lg hover:transform hover:scale-105 transition-all duration-200"
              >
                Add to Cart
              </button>
              <Link
                to={`/product/${product._id}`}
                className="btn-outline text-hookers_green border-2 border-hookers_green text-sm py-2 px-4 rounded-lg text-center hover:bg-hookers_green hover:text-black transition-all duration-200 font-semibold"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
