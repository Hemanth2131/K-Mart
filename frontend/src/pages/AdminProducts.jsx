import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Package, Plus, Edit3, Trash2, X, Tag, IndianRupee, Box, Image as ImageIcon } from 'lucide-react';

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

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/');
      return;
    }
    fetchProducts();
  }, [user, isAdmin]);

  const fetchProducts = async () => {
    const { data } = await api.get('/api/products');
    setProducts(data.products || []);
  };

  const addHandler = async () => {
    await api.post('/api/admin/products', form);
    setShowAdd(false);
    setForm({ name: '', price: '', countInStock: '', category: '', image: '' });
    fetchProducts();
  };

  const deleteHandler = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    await api.delete(`/api/admin/products/${id}`);
    fetchProducts();
  };

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

  const updateHandler = async () => {
    await api.put(`/api/admin/products/${editing}`, form);
    setEditing(null);
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 mb-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Inventory <span className="text-emerald-600">Hub</span></h1>
            <p className="mt-2 text-slate-500 font-medium">Full administrative control over your product catalog.</p>
          </div>

          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-200 active:scale-95"
          >
            <Plus size={20} />
            Add New Product
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Product</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Category</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Pricing</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Inventory</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {products.map((p) => (
                  <tr key={p._id} className="group hover:bg-slate-50/80 transition-all">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        {/* SMALL IMAGE SIZE IN TABLE */}
                        <div className="h-10 w-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                          {p.image ? (
                            <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-slate-300 bg-slate-50"><Package size={16} /></div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 leading-none mb-1">{p.name}</span>
                          <span className="text-[10px] font-medium text-slate-400 uppercase">ID: {p._id.slice(-6)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 rounded-md bg-slate-100 text-slate-600 text-[11px] font-black uppercase tracking-wider">
                        {p.category || 'General'}
                      </span>
                    </td>
                    <td className="px-8 py-5 font-bold text-slate-900">₹{p.price.toLocaleString()}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${p.countInStock > 0 ? 'text-slate-700' : 'text-rose-500'}`}>
                          {p.countInStock} Units
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => editHandler(p)} className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all">
                          <Edit3 size={16} />
                        </button>
                        <button onClick={() => deleteHandler(p._id)} className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-all">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {(showAdd || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => { setShowAdd(false); setEditing(null); }} />
          <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="px-8 pt-8 pb-4 flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900">{showAdd ? 'New Product' : 'Edit Product'}</h2>
              <button onClick={() => { setShowAdd(false); setEditing(null); }} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="p-8 space-y-5">
              {/* SMALL IMAGE PREVIEW IN MODAL */}
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <div className="h-16 w-16 rounded-xl bg-white border border-slate-200 overflow-hidden flex-shrink-0">
                   {form.image ? (
                     <img src={form.image} alt="Preview" className="h-full w-full object-cover" />
                   ) : (
                     <div className="h-full w-full flex items-center justify-center text-slate-300"><ImageIcon size={24} /></div>
                   )}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Image Preview</p>
                  <p className="text-[10px] text-slate-400">The thumbnail will appear as shown here.</p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Product Title</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all font-semibold"
                  placeholder="e.g. Premium Coffee Beans"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Price (₹)</label>
                  <input
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Stock</label>
                  <input
                    value={form.countInStock}
                    onChange={(e) => setForm({ ...form, countInStock: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Category</label>
                <input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Image Source URL</label>
                <input
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-xl py-3 px-4 outline-none transition-all font-medium text-slate-500 text-xs"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="p-8 pt-0 flex gap-3">
              <button
                onClick={showAdd ? addHandler : updateHandler}
                className="w-full bg-slate-900 hover:bg-emerald-600 text-white rounded-xl py-4 font-bold transition-all active:scale-95 shadow-lg shadow-slate-200"
              >
                {showAdd ? 'Create Product' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;