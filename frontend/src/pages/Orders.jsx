import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Package, Clock, CheckCircle, Calendar, Receipt } from 'lucide-react';

const Orders = ({ navigate }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role === 'admin') {
      navigate('/admin/orders');
      return;
    }

    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/api/orders/my');
      setOrders(data);
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 animate-spin rounded-2xl bg-gradient-to-r from-slate-200 to-slate-300 border-4 border-white/50 shadow-xl" />
          <p className="text-lg font-semibold text-slate-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-rose-50">
            <Package className="h-10 w-10 text-rose-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{error}</h2>
          <button
            onClick={fetchOrders}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-emerald-700 transition-all"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 py-12 font-sans">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-2xl border border-slate-200 shadow-sm mb-6">
            <Receipt className="h-6 w-6 text-emerald-600" />
            <h1 className="text-3xl font-bold text-slate-900">Order History</h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Track your recent purchases, view order details, and manage deliveries
          </p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="text-center py-24">
            <div className="mx-auto mb-8 inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-100">
              <Package className="h-12 w-12 text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              No orders yet
            </h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Your order history will appear here once you make your first purchase.
            </p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-xl hover:bg-emerald-700 hover:shadow-2xl transition-all"
            >
              Start shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="group cursor-pointer bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-slate-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* Order Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-sky-50 border-2 border-emerald-100">
                        <Receipt className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-600">
                          Order ID
                        </p>
                        <p className="text-lg font-bold text-slate-900">
                          #{order._id.slice(-8).toUpperCase()}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="h-4 w-4" />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <div className="flex h-2 w-2 rounded-full bg-emerald-400" />
                        {order.orderItems?.length || 0} items
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <div className="h-2 w-8 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              order.isDelivered
                                ? 'bg-emerald-500 w-full'
                                : 'bg-sky-400 w-1/2'
                            }`}
                          />
                        </div>
                        <span className="font-semibold">
                          {order.isDelivered ? 'Delivered' : 'Processing'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Total & Action */}
                  <div className="text-right md:text-center">
                    <div className="mb-6">
                      <p className="text-3xl font-black text-slate-900">
                        ₹{order.totalPrice?.toFixed(2)}
                      </p>
                      <p className="text-sm text-slate-500">Total incl. tax</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="flex-1 bg-slate-900 text-white py-3 px-6 rounded-xl text-sm font-semibold shadow-lg hover:bg-slate-800 transition-all group-hover:shadow-xl">
                        Invoice
                      </button>
                      <button className="flex-1 bg-emerald-600 text-white py-3 px-6 rounded-xl text-sm font-semibold shadow-lg hover:bg-emerald-700 transition-all group-hover:shadow-xl">
                        Track
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
