import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5010/api/auth/register', {
        name,
        email,
        password,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-white px-3">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: '100%', maxWidth: '450px' }}>
        <h2 className="text-center fw-bold mb-4" style={{ color: '#7A4B3A' }}>
          Create your ShopNest account
        </h2>

        {error && (
          <div className="alert alert-danger text-center py-2 small mb-3">
            {error}
          </div>
        )}

        <form onSubmit={submitHandler}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label text-muted fw-semibold">Name</label>
            <input
              type="text"
              className="form-control form-control-lg bg-light border border-secondary-subtle"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label text-muted fw-semibold">Email address</label>
            <input
              type="email"
              className="form-control form-control-lg bg-light border border-secondary-subtle"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label text-muted fw-semibold">Password</label>
            <input
              type="password"
              className="form-control form-control-lg bg-light border border-secondary-subtle"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-success btn-lg fw-semibold shadow"
              style={{ backgroundColor: '#76B041', border: 'none' }}
            >
              Register
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-muted">
            Have an account?{' '}
            <Link to="/login" className="text-success fw-semibold text-decoration-none">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
