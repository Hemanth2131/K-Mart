// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { Package, ArrowLeft, ShoppingCart, ShieldCheck, Truck, RotateCcw, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import api from '../utils/api';
import Toast from '../components/Toast';

const ProductDetail = ({ id, navigate }) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setToast({ message: 'Added to cart!', type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          <div className="h-16 w-16 border-4 border-slate-200 border-t-emerald-600 rounded-full animate-spin"></div>
          <p className="mt-4 font-medium text-slate-500">Loading details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
          <Package className="mx-auto h-16 w-16 text-slate-300 mb-4" />
          <h2 className="text-2xl font-bold text-slate-900">Product Missing</h2>
          <button onClick={() => navigate('/')} className="mt-6 text-emerald-600 font-semibold hover:underline flex items-center justify-center gap-2">
            <ArrowLeft size={18} /> Return to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Top Navigation */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-medium transition-colors">
            <ArrowLeft size={20} />
            <span>Back to Collection</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 lg:pt-12">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left: Image Gallery Visual */}
          <div className="lg:col-span-7">
            <div className="sticky top-24 space-y-4">
              <div className="aspect-square bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm group">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="h-full w-full object-contain p-8 group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-slate-50">
                    <Package size={80} className="text-slate-200" />
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <div className="h-24 w-24 rounded-2xl border-2 border-emerald-500 bg-white p-2">
                   <img src={product.image} alt="thumbnail" className="h-full w-full object-contain" />
                </div>
                <div className="h-24 w-24 rounded-2xl border border-slate-200 bg-slate-100 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-4 tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-bold text-slate-900">₹{product.price.toLocaleString()}</span>
              {product.countInStock > 0 ? (
                <span className="text-emerald-600 font-semibold flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-lg text-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" /> In Stock
                </span>
              ) : (
                <span className="text-rose-600 font-semibold bg-rose-50 px-3 py-1 rounded-lg text-sm">Out of Stock</span>
              )}
            </div>

            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Experience the perfect blend of quality and design. This premium {product.category} is crafted for those who value durability and aesthetic excellence.
            </p>

            {/* Order Controls */}
            <div className="space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-8">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">Quantity</span>
                <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="h-10 w-10 flex items-center justify-center rounded-lg bg-white shadow-sm hover:text-emerald-600 disabled:opacity-50 transition-all"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.countInStock, quantity + 1))}
                    disabled={quantity >= product.countInStock}
                    className="h-10 w-10 flex items-center justify-center rounded-lg bg-white shadow-sm hover:text-emerald-600 disabled:opacity-50 transition-all"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                className="w-full h-14 bg-slate-900 hover:bg-emerald-700 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={20} />
                Add to Cart — ₹{(product.price * quantity).toLocaleString()}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-8">
              <div className="text-center">
                <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2 text-slate-600">
                  <Truck size={20} />
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Fast Delivery</span>
              </div>
              <div className="text-center">
                <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2 text-slate-600">
                  <RotateCcw size={20} />
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">14 Day Return</span>
              </div>
              <div className="text-center">
                <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2 text-slate-600">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Secure Pay</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;