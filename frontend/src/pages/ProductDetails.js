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

  if (!product) return <div className="text-center mt-5">Loading...</div>;

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="container py-5">
      <div className="row bg-light rounded-4 shadow-sm p-4">
        {/* Left Column - Images */}
        <div className="col-lg-6 mb-4 mb-lg-0 text-center">
          <img
            src={selectedImage || 'https://via.placeholder.com/512'}
            alt={product.name}
            className="img-fluid rounded-4 shadow-sm mb-3"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />

          {/* Thumbnail images */}
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {images.length > 1 &&
              images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.name}-${idx}`}
                  className={`img-thumbnail border-2 ${selectedImage === img ? 'border-success' : ''}`}
                  style={{ width: '80px', height: '80px', objectFit: 'cover', cursor: 'pointer' }}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="col-lg-6">
          <h2 className="fw-bold text-success mb-3">{product.name}</h2>
          <p className="text-muted mb-4">{product.description}</p>

          <h3 className="fw-bold text-dark mb-4">${product.price.toFixed(2)}</h3>

          <div className="mb-4">
            <label htmlFor="qty" className="form-label fw-semibold">Quantity:</label>
            <input
              type="number"
              id="qty"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="form-control w-25"
            />
          </div>

          <button
            onClick={addToCartHandler}
            className="btn btn-success btn-lg px-4"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
