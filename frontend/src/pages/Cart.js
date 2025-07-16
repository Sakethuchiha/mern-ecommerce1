import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, updateCartQty, removeFromCart } from '../redux/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.user.userInfo);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartStatus = useSelector((state) => state.cart.status);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(fetchCart(userInfo.token));
    }
  }, [dispatch, navigate, userInfo]);

  const updateQty = (productId, qty) => {
    if (qty < 1) return;
    dispatch(updateCartQty({ productId, qty, token: userInfo.token }));
  };

  const removeItem = (productId) => {
    dispatch(removeFromCart({ productId, token: userInfo.token }));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const proceedToCheckout = () => {
    navigate('/checkout');
  };

  if (cartStatus === 'loading') {
    return <div>Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return (
    <div className="container mx-auto p-6 bg-ash_gray-900 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-extrabold mb-6 text-hookers_green">Your Cart is Empty</h2>
      <Link to="/" className="text-cambridge_blue hover:underline text-lg">Go Back</Link>
    </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-ash_gray-900 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-8 text-hookers_green">Shopping Cart</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {cartItems.map(item => {
            const productId = typeof item.product === 'string' ? item.product : item.product._id || item.product.id || JSON.stringify(item.product);
            return (
              <div key={productId} className="bg-ash_gray-500 rounded-2xl shadow-card flex flex-col md:flex-row items-center gap-6 p-4 md:p-6 hover:shadow-xl transition-shadow relative border border-dark_slate_gray">
                <Link to={`/product/${productId}`} className="w-full md:w-32 flex-shrink-0 flex items-center justify-center">
                  <img
                    src={item.image || 'https://via.placeholder.com/120x120?text=No+Image'}
                    alt={item.name}
                    className="w-28 h-28 object-contain rounded-lg bg-ash_gray-300"
                  />
                </Link>
                <div className="flex-1 w-full flex flex-col gap-2">
                  <Link to={`/product/${productId}`} className="text-lg font-semibold text-hookers_green hover:underline line-clamp-2 mb-1">{item.name}</Link>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-charcoal font-medium">Qty:</span>
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) => updateQty(productId, Number(e.target.value))}
                      className="border border-dark_slate_gray rounded-lg p-2 w-20 focus:outline-none focus:ring-2 focus:ring-cambridge_blue text-charcoal"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 min-w-[100px]">
                  <span className="text-xl font-bold text-hookers_green">${(item.price * item.qty).toFixed(2)}</span>
                  <button
                    onClick={() => removeItem(productId)}
                    className="bg-cambridge_blue text-ash_gray-900 px-4 py-2 rounded-lg hover:bg-cambridge_blue/80 transition-colors duration-200 font-semibold border border-cambridge_blue"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {/* Summary Card */}
        <div className="bg-ash_gray-500 rounded-2xl shadow-card p-6 flex flex-col gap-6 h-fit sticky top-28 border border-dark_slate_gray">
          <h3 className="text-2xl font-semibold text-hookers_green mb-2">Order Summary</h3>
          <div className="flex justify-between text-lg font-medium text-charcoal">
            <span>Subtotal</span>
            <span className="text-hookers_green font-bold">${subtotal.toFixed(2)}</span>
          </div>
          <button
            onClick={proceedToCheckout}
            className="bg-hookers_green text-ash_gray-900 px-8 py-3 rounded-xl mt-2 hover:bg-hookers_green/90 transition-colors duration-200 font-semibold text-lg shadow-sm"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
