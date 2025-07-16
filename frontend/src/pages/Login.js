import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/userSlice';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5010/api/auth/login', credentials);
      dispatch(loginSuccess(data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-white px-3">
      <div className="card shadow-lg rounded-4 p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4 fw-bold" style={{ color: '#7A4B3A' }}>
          SHOPNEST
        </h2>

        {error && (
          <div className="alert alert-danger text-center py-2">
            {error}
          </div>
        )}

        <form onSubmit={submitHandler}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-muted fw-medium">
              Email address
            </label>
            <input
              type="email"
              className="form-control form-control-lg bg-light border border-secondary-subtle"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="form-label text-muted fw-medium">
              Password
            </label>
            <div className="input-group">
              <input
                type={passwordVisible ? 'text' : 'password'}
                className="form-control form-control-lg bg-light border border-secondary-subtle"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-success btn-lg fw-semibold shadow"
              style={{ backgroundColor: '#76B041', border: 'none' }}
            >
              LOGIN
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-muted">
            New to ShopNest?{' '}
            <Link to="/register" className="text-success fw-semibold text-decoration-none">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
