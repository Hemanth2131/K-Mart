import React, { useEffect, useState } from 'react';
import { Package, ShoppingBag, Search, ArrowRight } from 'lucide-react';
import api from '../utils/api';

const Home = ({ navigate }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/api/products');
        const productList = Array.isArray(data.products) ? data.products : [];
        setProducts(productList);
        // Featured: first 4 products
        setFeaturedProducts(productList.slice(0, 4));
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-emerald-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/30 border-t-sky-500 shadow-xl" />
          <p className="text-sm font-medium text-slate-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-rose-50">
            <Package className="h-10 w-10 text-rose-400" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-sm text-slate-500 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-emerald-50 font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 via-emerald-500/10 to-sky-500/20" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <div className="mx-auto mb-8 max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-6 leading-tight">
              Discover Amazing
              <span className="block bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                Products
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-slate-600 mb-8">
              Explore our curated collection of high-quality products. Fast delivery, secure payments, and exceptional customer service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/products')}
                className="group inline-flex items-center gap-3 rounded-2xl bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all hover:bg-emerald-700 hover:shadow-2xl hover:-translate-y-1"
              >
                <ShoppingBag className="h-5 w-5" />
                Shop now
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                Free shipping over ₹500
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-20 relative">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
                Featured products
              </h2>
              <p className="mx-auto max-w-md text-lg text-slate-600">
                Our top picks for you
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div
                  key={product._id}
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100"
                >
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-50 to-sky-50">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Package className="h-16 w-16 text-slate-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        {product.category || 'New'}
                      </span>
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-slate-900 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-black text-slate-900">
                        ₹{product.price}
                      </div>
                      <div
                        className={`text-sm font-semibold ${
                          product.countInStock > 0
                            ? 'text-emerald-600'
                            : 'text-rose-600'
                        }`}
                      >
                        {product.countInStock > 0
                          ? `${product.countInStock} left`
                          : 'Out of stock'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {products.length > 4 && (
              <div className="mt-16 text-center">
                <button
                  onClick={() => navigate('/products')}
                  className="inline-flex items-center gap-3 rounded-2xl bg-white/70 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-slate-900 border border-slate-200 shadow-xl transition-all hover:bg-white hover:shadow-2xl hover:-translate-y-1"
                >
                  View all products
                  <ArrowRight className="h-5 w-5 transition-transform hover:translate-x-1" />
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Empty State */}
      {products.length === 0 && (
        <section className="py-32">
          <div className="mx-auto max-w-md text-center px-6">
            <div className="mx-auto mb-8 inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-100">
              <Package className="h-12 w-12 text-slate-400" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              No products available
            </h2>
            <p className="text-lg text-slate-500 mb-8">
              Our store is currently restocking. Check back soon for amazing products!
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
