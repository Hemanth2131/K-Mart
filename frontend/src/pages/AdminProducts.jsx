import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import {
  Package,
  Plus,
  Edit3,
  Trash2,
  X,
  Image as ImageIcon,
} from 'lucide-react';

const AdminProducts = ({ navigate }) => {
  const { user, isAdmin } = useAuth();

  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const [form, setForm] = useState({
    name: '',
    price: '',
    countInStock: '',
    category: '',
    image: '',
  });

  /* =========================
     AUTH + INITIAL FETCH
  ========================= */
  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/');
      return;
    }
    fetchProducts();
  }, [user, isAdmin]);

  /* =========================
     FETCH PRODUCTS (ADMIN)
  ========================= */
  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/api/admin/products');
      setProducts(data);
    } catch (error) {
      console.error(
        'Fetch products error:',
        error.response?.data || error.message
      );
    }
  };

  /* =========================
     ADD PRODUCT
  ========================= */
  const addHandler = async () => {
    if (!form.name || !form.category || !form.price || !form.countInStock) {
      alert('Please fill all required fields');
      return;
    }

    try {
      await api.post('/api/admin/products', {
        name: form.name,
        category: form.category,
        image: form.image,
        price: Number(form.price),
        countInStock: Number(form.countInStock),
      });

      setShowAdd(false);
      setForm({
        name: '',
        price: '',
        countInStock: '',
        category: '',
        image: '',
      });

      fetchProducts();
    } catch (error) {
      console.error(
        'Add product error:',
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || 'Failed to add product');
    }
  };

  /* =========================
     DELETE PRODUCT
  ========================= */
  const deleteHandler = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await api.delete(`/api/admin/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error(
        'Delete product error:',
        error.response?.data || error.message
      );
      alert('Failed to delete product');
    }
  };

  /* =========================
     EDIT PRODUCT
  ========================= */
  const editHandler = (product) => {
    setEditing(product._id);
    setForm({
      name: product.name,
      price: product.price,
      countInStock: product.countInStock,
      category: product.category,
      image: product.image || '',
    });
  };

  /* =========================
     UPDATE PRODUCT
  ========================= */
  const updateHandler = async () => {
    try {
      await api.put(`/api/admin/products/${editing}`, {
        name: form.name,
        category: form.category,
        image: form.image,
        price: Number(form.price),
        countInStock: Number(form.countInStock),
      });

      setEditing(null);
      fetchProducts();
    } catch (error) {
      console.error(
        'Update product error:',
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || 'Failed to update product');
    }
  };

  /* =========================
     UI
  ========================= */
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="py-10 flex justify-between items-center border-b mb-8">
          <h1 className="text-3xl font-black text-slate-900">
            Admin <span className="text-emerald-600">Products</span>
          </h1>

          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold"
          >
            <Plus size={18} /> Add Product
          </button>
        </div>

        {/* PRODUCTS TABLE */}
        <div className="bg-white rounded-2xl shadow border overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="p-4 text-left">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b hover:bg-slate-50">
                  <td className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="h-full w-full object-cover rounded-lg" />
                      ) : (
                        <Package size={16} />
                      )}
                    </div>
                    <span className="font-bold">{p.name}</span>
                  </td>
                  <td className="p-4">{p.category}</td>
                  <td className="p-4">₹{p.price}</td>
                  <td className="p-4">{p.countInStock}</td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button onClick={() => editHandler(p)}>
                      <Edit3 size={16} />
                    </button>
                    <button onClick={() => deleteHandler(p._id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {(showAdd || editing) && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-black text-lg">
                {showAdd ? 'Add Product' : 'Edit Product'}
              </h2>
              <X
                className="cursor-pointer"
                onClick={() => {
                  setShowAdd(false);
                  setEditing(null);
                }}
              />
            </div>

            {['name', 'price', 'countInStock', 'category', 'image'].map((field) => (
              <input
                key={field}
                placeholder={field}
                value={form[field]}
                onChange={(e) =>
                  setForm({ ...form, [field]: e.target.value })
                }
                className="w-full mb-3 p-3 border rounded-lg"
              />
            ))}

            <button
              onClick={showAdd ? addHandler : updateHandler}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold"
            >
              {showAdd ? 'Create Product' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
