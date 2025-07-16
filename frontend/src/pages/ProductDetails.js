import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5010/api/products/${id}`);
        setProduct(data);
        setSelectedImage(data.image || '');
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    if (!userInfo) {
      alert('Please login to add items to cart');
      return;
    }
    dispatch(addToCart({ product, qty, token: userInfo.token }));
    alert(`${product.name} added to cart`);
    navigate('/cart');
  };

  if (!product) return <div>Loading...</div>;

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-ash_gray-900 rounded-xl border border-dark_slate_gray shadow-card">
      <h2 className="text-4xl font-extrabold mb-6 text-hookers_green">{product.name}</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center md:items-start">
          <img
            src={selectedImage || 'https://via.placeholder.com/512'}
            alt={product.name}
            className="w-full max-w-lg mx-auto md:mx-0 rounded-xl mb-4 shadow-lg"
          />
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {images.length > 1 && images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name}-${idx}`}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-4 transition-colors duration-300 ${
                  selectedImage === img ? 'border-hookers_green' : 'border-transparent hover:border-hookers_green/70'
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <p className="mb-6 text-charcoal text-lg leading-relaxed">{product.description}</p>
          <h3 className="text-3xl font-bold mb-6 text-hookers_green">${product.price.toFixed(2)}</h3>
          <div className="mb-6">
            <label htmlFor="qty" className="block mb-2 font-semibold text-charcoal">Quantity:</label>
            <input
              type="number"
              id="qty"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="border border-dark_slate_gray rounded-lg p-3 w-24 focus:outline-none focus:ring-2 focus:ring-cambridge_blue text-charcoal"
            />
          </div>
          <button
            onClick={addToCartHandler}
            className="bg-hookers_green text-ash_gray-900 px-8 py-3 rounded-xl hover:bg-hookers_green/80 transition-colors duration-300 font-semibold"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
