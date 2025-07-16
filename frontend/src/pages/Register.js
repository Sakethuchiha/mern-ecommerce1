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
      const { data } = await axios.post('http://localhost:5010/api/auth/register', { name, email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      setError(err.response && err.response.data.message ? err.response.data.message : err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ash_gray-900 py-8 px-2">
      <div className="w-50 max-w-md bg-ash_gray-500 border border-dark_slate_gray rounded-2xl shadow-lg p-4 flex flex-col">
        <h2 className="text-3xl font-extrabold text-hookers_green mb-6 text-center">Create your ShopNest account</h2>
        {error && <div className="bg-cambridge_blue text-ash_gray-900 px-4 py-2 rounded mb-4 text-sm">{error}</div>}
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-charcoal">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-dark_slate_gray rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cambridge_blue bg-ash_gray-300 text-charcoal"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-charcoal">Email address</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-dark_slate_gray rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cambridge_blue bg-ash_gray-300 text-charcoal"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-charcoal">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-dark_slate_gray rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cambridge_blue bg-ash_gray-300 text-charcoal"
            />
          </div>
          <button type="submit" className="bg-hookers_green text-ash_gray-900 rounded-lg px-4 py-2 font-semibold hover:bg-hookers_green/80 transition">Register</button>
        </form>
        <p className="mt-6 text-center text-charcoal">
          Have an Account?{' '}
          <Link to="/login" className="text-hookers_green hover:underline font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
