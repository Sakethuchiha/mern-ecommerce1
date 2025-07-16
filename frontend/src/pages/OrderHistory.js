import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo) {
          setError('Please login to view order history');
          return;
        }
        const { data } = await axios.get('http://localhost:5010/api/orders/myorders', {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        setOrders(data);
      } catch (err) {
        setError(err.response && err.response.data.message ? err.response.data.message : err.message);
      }
    };
    fetchOrders();
  }, []);

  if (error) {
    return <div className="container mx-auto p-4 text-cambridge_blue">{error}</div>;
  }

  if (orders.length === 0) {
    return <div className="container mx-auto p-4 text-charcoal">You have no orders.</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl bg-ash_gray-900 rounded-xl border border-dark_slate_gray shadow-card">
      <h2 className="text-3xl font-bold mb-4 text-hookers_green">Order History</h2>
      <table className="min-w-full border border-dark_slate_gray bg-ash_gray-500">
        <thead className="bg-dark_slate_gray text-ash_gray-900">
          <tr>
            <th className="border border-dark_slate_gray px-4 py-2">Order ID</th>
            <th className="border border-dark_slate_gray px-4 py-2">Date</th>
            <th className="border border-dark_slate_gray px-4 py-2">Total</th>
            <th className="border border-dark_slate_gray px-4 py-2">Paid</th>
            <th className="border border-dark_slate_gray px-4 py-2">Delivered</th>
            <th className="border border-dark_slate_gray px-4 py-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id} className="border border-dark_slate_gray text-charcoal">
              <td className="border border-dark_slate_gray px-4 py-2">{order._id}</td>
              <td className="border border-dark_slate_gray px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="border border-dark_slate_gray px-4 py-2">${order.totalPrice.toFixed(2)}</td>
              <td className="border border-dark_slate_gray px-4 py-2">{order.isPaid ? 'Yes' : 'No'}</td>
              <td className="border border-dark_slate_gray px-4 py-2">{order.isDelivered ? 'Yes' : 'No'}</td>
              <td className="border border-dark_slate_gray px-4 py-2">
                <Link to={`/order/${order._id}`} className="text-hookers_green hover:underline">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
