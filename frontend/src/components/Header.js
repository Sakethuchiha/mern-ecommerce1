import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

const Header = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-light border-bottom shadow-sm">
      <div className="container d-flex justify-content-between align-items-center py-3">
        {/* Left: Logo */}
        <div className="d-flex align-items-center">
          <Link to="/" className="text-success fw-bold fs-3 text-decoration-none">
            ShopNest
          </Link>
        </div>
        {/* Center: Empty for future use */}
        <div className="flex-grow-1 mx-3" style={{ maxWidth: '30rem' }}></div>
        {/* Right: Cart and User */}
        <nav className="d-flex align-items-center gap-3">
          <Link
            to="/cart"
            className="position-relative d-flex align-items-center px-3 py-2 rounded border border-success text-body text-decoration-none"
            style={{ height: '32px' }}
          >
            <span className="ms-2 fs-6 fw-medium">Cart ({cartItems.length})</span>
          </Link>
          {userInfo ? (
            <div className="d-flex align-items-center gap-3" style={{ height: '32px' }}>
              <span className="d-none d-md-inline fw-semibold text-body align-middle">
                {userInfo.name || userInfo.email}
              </span>
              <button
                onClick={logoutHandler}
                className="btn btn-danger btn-sm px-3 py-1 fw-semibold align-middle"
                style={{ height: '32px' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="d-flex align-items-center text-body text-decoration-none border border-transparent rounded"
              style={{ height: '32px' }}
            >
              <span className="d-none d-md-inline align-middle">Login</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
