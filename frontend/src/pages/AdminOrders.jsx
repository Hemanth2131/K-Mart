import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Toast from '../components/Toast';

const AdminOrders = ({ navigate }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/');
      return;
    }

    fetchOrders();
  }, [user, isAdmin, navigate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/api/admin/orders');
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setToast({
        message: 'Failed to load orders',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsDelivered = async (id) => {
    try {
      await api.put(`/api/admin/orders/${id}/deliver`);

      setToast({
        message: 'Order marked as delivered',
        type: 'success',
      });
      fetchOrders();
    } catch (error) {
      setToast({
        message: error.response?.data?.message || 'Update failed',
        type: 'error',
      });
    }
  };

  if (!user || !isAdmin) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-sky-500" />
          <p className="text-sm font-medium text-slate-500">
            Loading orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-sky-50 to-emerald-50 px-4 py-10 font-sans sm:px-6 lg:px-8">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Manage orders
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Track payment status and mark orders as delivered.
            </p>
          </div>
          <div className="inline-flex items-center rounded-full bg-white/70 px-4 py-1 text-xs font-medium text-slate-500 shadow-sm">
            <span className="mr-2 h-2 w-2 rounded-full bg-emerald-400" />
            {orders.length} orders found
          </div>
        </header>

        {/* Orders Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-sm">
          <div className="border-b border-slate-100 bg-slate-50/80 px-4 py-3">
            <h2 className="text-sm font-semibold text-slate-700">
              Recent orders
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Paid</th>
                  <th className="px-4 py-3">Delivered</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-4 py-12 text-center text-sm text-slate-500"
                    >
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr
                      key={order._id}
                      className="bg-white/80 transition hover:bg-sky-50/70"
                    >
                      <td className="px-4 py-3 font-mono text-xs text-slate-600">
                        #{order._id.slice(-8)}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-700">
                        {order.user?.name || 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                        ₹{order.totalPrice?.toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                            order.isPaid
                              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100'
                              : 'bg-amber-50 text-amber-700 ring-1 ring-amber-100'
                          }`}
                        >
                          <span
                            className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                              order.isPaid ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                          />
                          {order.isPaid ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                            order.isDelivered
                              ? 'bg-sky-50 text-sky-700 ring-1 ring-sky-100'
                              : 'bg-rose-50 text-rose-700 ring-1 ring-rose-100'
                          }`}
                        >
                          <span
                            className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                              order.isDelivered ? 'bg-sky-500' : 'bg-rose-500'
                            }`}
                          />
                          {order.isDelivered ? 'Delivered' : 'Not delivered'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {!order.isDelivered && (
                          <button
                            onClick={() => markAsDelivered(order._id)}
                            className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1"
                          >
                            Mark delivered
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
