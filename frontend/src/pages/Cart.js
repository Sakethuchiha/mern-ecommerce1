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
    return <div className="text-center mt-5">Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
        <h2 className="text-success mb-3">Your Cart is Empty</h2>
        <Link to="/" className="btn btn-outline-success">Go Back</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold text-success text-center">Shopping Cart</h2>
      <div className="row g-4">
        {/* Cart Items */}
        <div className="col-lg-8">
          {cartItems.map((item) => {
            const productId = typeof item.product === 'string' ? item.product : item.product._id || item.product.id || JSON.stringify(item.product);
            return (
              <div key={productId} className="card mb-4 shadow-sm">
                <div className="row g-0 align-items-center">
                  <div className="col-md-3 text-center">
                    <Link to={`/product/${productId}`}>
                      <img
                        src={item.image || 'https://via.placeholder.com/120x120?text=No+Image'}
                        alt={item.name}
                        className="img-fluid rounded-start p-2"
                        style={{ maxHeight: '120px', objectFit: 'contain' }}
                      />
                    </Link>
                  </div>
                  <div className="col-md-6">
                    <div className="card-body">
                      <Link to={`/product/${productId}`} className="card-title h5 text-decoration-none text-success">{item.name}</Link>
                      <div className="mt-3 d-flex align-items-center gap-2">
                        <label className="mb-0">Qty:</label>
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) => updateQty(productId, Number(e.target.value))}
                          className="form-control form-control-sm w-25"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 text-end pe-4">
                    <div className="d-flex flex-column align-items-end justify-content-center h-100">
                      <span className="fw-bold fs-5 text-success mb-2">${(item.price * item.qty).toFixed(2)}</span>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => removeItem(productId)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card shadow-lg sticky-top" style={{ top: '100px' }}>
            <div className="card-body">
              <h5 className="card-title text-success fw-bold">Order Summary</h5>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <span className="fw-medium">Subtotal</span>
                <span className="fw-bold text-success">${subtotal.toFixed(2)}</span>
              </div>
              <button
                className="btn btn-success w-100 fw-semibold"
                onClick={proceedToCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
