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
        setError(err.response && err.response.data.message ? err.response.data.message : err.message);
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
      // Clear cart on backend after order placed
      await axios.delete('http://localhost:5010/api/cart/clear', config).catch(() => {});
      setCartItems([]);
      navigate(`/order/${data._id}`);
    } catch (err) {
      setError(err.response && err.response.data.message ? err.response.data.message : err.message);
    }
  };

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-6 max-w-md bg-ash_gray-900 rounded-xl border border-dark_slate_gray shadow-card">
      <h2 className="text-3xl font-extrabold text-hookers_green mb-6 text-center">Checkout</h2>
      {error && <div className="bg-cambridge_blue text-ash_gray-900 px-4 py-2 rounded mb-4 text-sm">{error}</div>}
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <h4 className="text-xl font-semibold text-hookers_green mb-2">Shipping Address</h4>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-charcoal">Address</label>
          <input
            type="text"
            name="address"
            value={shippingAddress.address}
            onChange={handleChange}
            required
            className="border border-dark_slate_gray rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cambridge_blue bg-ash_gray-300 text-charcoal"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-charcoal">City</label>
          <input
            type="text"
            name="city"
            value={shippingAddress.city}
            onChange={handleChange}
            required
            className="border border-dark_slate_gray rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cambridge_blue bg-ash_gray-300 text-charcoal"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-charcoal">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={shippingAddress.postalCode}
            onChange={handleChange}
            required
            className="border border-dark_slate_gray rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cambridge_blue bg-ash_gray-300 text-charcoal"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-charcoal">Country</label>
          <input
            type="text"
            name="country"
            value={shippingAddress.country}
            onChange={handleChange}
            required
            className="border border-dark_slate_gray rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cambridge_blue bg-ash_gray-300 text-charcoal"
          />
        </div>
        <h4 className="text-xl font-semibold text-hookers_green mb-2">Payment Method</h4>
        <div className="flex flex-col gap-1">
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border border-dark_slate_gray rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cambridge_blue bg-ash_gray-300 text-charcoal"
          >
            <option value="PayPal">PayPal</option>
            <option value="Stripe">Stripe</option>
          </select>
        </div>
        <button type="submit" className="bg-hookers_green text-ash_gray-900 rounded-lg px-4 py-2 font-semibold hover:bg-hookers_green/80 transition mt-4">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
