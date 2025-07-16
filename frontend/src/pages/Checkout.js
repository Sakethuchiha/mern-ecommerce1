import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      if (!userInfo) {
        navigate('/login');
        return;
      }
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get('http://localhost:5010/api/cart', config);
        setCartItems(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };
    fetchCart();
  }, [userInfo, navigate]);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      navigate('/login');
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const order = {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice,
      };

      const { data } = await axios.post('http://localhost:5010/api/orders', order, config);
      await axios.delete('http://localhost:5010/api/cart/clear', config).catch(() => {});
      setCartItems([]);
      navigate(`/order/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-5" style={{ maxWidth: '600px', width: '100%' }}>
        <h2 className="mb-4 text-center fw-bold text-success">Checkout</h2>

        {error && (
          <div className="alert alert-danger text-center small">{error}</div>
        )}

        <form onSubmit={submitHandler}>
          <h5 className="text-success mb-3">Shipping Address</h5>

          <div className="mb-3">
            <label className="form-label fw-semibold">Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={shippingAddress.address}
              onChange={handleChange}
              required
              placeholder="Enter address"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={shippingAddress.city}
              onChange={handleChange}
              required
              placeholder="Enter city"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Postal Code</label>
            <input
              type="text"
              className="form-control"
              name="postalCode"
              value={shippingAddress.postalCode}
              onChange={handleChange}
              required
              placeholder="Enter postal code"
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Country</label>
            <input
              type="text"
              className="form-control"
              name="country"
              value={shippingAddress.country}
              onChange={handleChange}
              required
              placeholder="Enter country"
            />
          </div>

          <h5 className="text-success mb-3">Payment Method</h5>
          <div className="mb-4">
            <select
              className="form-select"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="PayPal">PayPal</option>
              <option value="Stripe">Stripe</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100 fw-semibold">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
