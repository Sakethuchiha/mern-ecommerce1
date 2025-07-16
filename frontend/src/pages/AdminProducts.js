import React, { useEffect, useState } from 'react';
import axios from 'axios';

const initialForm = {
  name: '',
  category: '',
  image: '',
  description: '',
  price: '',
  countInStock: '',
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const getAuthConfig = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/products', getAuthConfig());
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const { data } = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setForm({ ...form, image: data.imageUrl });
    } catch (err) {
      setError('Failed to upload image');
    }
  };

  const handleAdd = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      image: product.image,
      description: product.description,
      price: product.price,
      countInStock: product.countInStock,
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete(`/api/products/${id}`, getAuthConfig());
      fetchProducts();
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/products/${editingId}`, form, getAuthConfig());
      } else {
        await axios.post('/api/products', form, getAuthConfig());
      }
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      setError('Failed to save product');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin: Manage Products</h1>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <button className="bg-emerald-600 text-white px-4 py-2 rounded mb-4" onClick={handleAdd}>
        Add Product
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border p-4 rounded mb-6 flex flex-col gap-3">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" required />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border p-2 rounded" required />
          <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL or upload below" className="border p-2 rounded" required />
          <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 rounded" />
          {form.image && <img src={form.image} alt="preview" className="h-20 object-contain mb-2" />}
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded" required />
          <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded" required />
          <input name="countInStock" type="number" value={form.countInStock} onChange={handleChange} placeholder="Count In Stock" className="border p-2 rounded" required />
          <div className="flex gap-2">
            <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded">{editingId ? 'Update' : 'Add'}</button>
            <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">{p.category}</td>
                <td className="border p-2">₹{p.price}</td>
                <td className="border p-2">{p.countInStock}</td>
                <td className="border p-2 flex gap-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminProducts; 