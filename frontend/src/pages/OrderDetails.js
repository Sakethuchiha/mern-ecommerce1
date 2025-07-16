import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo) {
          setError('Please login to view order details');
          return;
        }
        const { data } = await axios.get(`http://localhost:5010/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        setOrder(data);
      } catch (err) {
        setError(err.response && err.response.data.message ? err.response.data.message : err.message);
      }
    };
    fetchOrder();
  }, [id]);

  if (error) {
    return <div className="container mx-auto p-4 text-red-600">{error}</div>;
  }

  if (!order) {
    return <div className="container mx-auto p-4">Loading order details...</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl bg-ash_gray-900 rounded-xl border border-dark_slate_gray shadow-card text-charcoal">
      <h2 className="text-3xl font-bold mb-4 text-hookers_green">Order {order._id}</h2>
      <h3 className="text-xl font-semibold mb-2 text-hookers_green">Shipping Address</h3>
      <p className="mb-4">{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
      <h3 className="text-xl font-semibold mb-2 text-hookers_green">Payment Method</h3>
      <p className="mb-4">{order.paymentMethod}</p>
      <h3 className="text-xl font-semibold mb-2 text-hookers_green">Order Items</h3>
      <ul className="border border-dark_slate_gray rounded-lg overflow-hidden mb-4">
        {order.orderItems.map(item => (
          <li key={item.product} className="flex justify-between border-b border-dark_slate_gray py-2 px-4 last:border-b-0">
            <Link to={`/product/${item.product}`} className="text-cambridge_blue hover:underline">{item.name}</Link>
            <span>{item.qty} x ${item.price.toFixed(2)} = ${(item.qty * item.price).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <h3 className="text-xl font-semibold mb-2 text-hookers_green">Order Summary</h3>
      <div className="bg-ash_gray-500 p-4 rounded-lg border border-dark_slate_gray">
        <p className="flex justify-between">Tax: <span>${order.taxPrice.toFixed(2)}</span></p>
        <p className="flex justify-between">Shipping: <span>${order.shippingPrice.toFixed(2)}</span></p>
        <p className="flex justify-between font-bold text-hookers_green">Total: <span>${order.totalPrice.toFixed(2)}</span></p>
        <p className="flex justify-between">Status: <span>{order.isPaid ? `Paid at ${new Date(order.paidAt).toLocaleString()}` : 'Not Paid'}</span></p>
        <p className="flex justify-between">Delivery: <span>{order.isDelivered ? `Delivered at ${new Date(order.deliveredAt).toLocaleString()}` : 'Not Delivered'}</span></p>
      </div>
    </div>
  );
};

export default OrderDetails;
