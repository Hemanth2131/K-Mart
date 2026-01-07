// src/pages/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Toast from '../components/Toast';

const Checkout = ({ navigate }) => {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'PayPal',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role === 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        orderItems: cart.map((item) => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod,
        itemsPrice: total,
        shippingPrice: 10,
        taxPrice: total * 0.1,
        totalPrice: total + 10 + total * 0.1,
      };

      await api.post('/api/orders', orderData);

      clearCart();
      setToast({ message: 'Order placed successfully!', type: 'success' });
      setTimeout(() => navigate('/orders'), 2000);
    } catch (error) {
      setToast({
        message: error.response?.data?.message || 'Order failed',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const shippingPrice = 10;
  const taxPrice = total * 0.1;
  const totalPrice = total + shippingPrice + taxPrice;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-slate-50 to-emerald-50 px-4 py-10 font-sans sm:px-6 lg:px-8">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Checkout
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Enter your shipping details and choose a payment method to place your order.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Shipping Address */}
          <section className="rounded-2xl border border-sky-100 bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900">
              Shipping address
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Your order will be delivered to this address.
            </p>

            <div className="mt-5 space-y-4">
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-1 focus:ring-sky-400"
                required
              />
              <div className="grid gap-4 sm:grid-cols  -2">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-1 focus:ring-sky-400"
                  required
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-1 focus:ring-sky-400"
                  required
                />
              </div>
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-1 focus:ring-sky-400"
                required
              />
            </div>
          </section>

          {/* Payment Method */}
          <section className="rounded-2xl border border-emerald-100 bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900">
              Payment method
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Secure payment powered by your selected provider.
            </p>

            <div className="mt-5">
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-1 focus:ring-emerald-400"
              >
                <option value="PayPal">PayPal</option>
                <option value="Stripe">Stripe</option>
                <option value="Credit Card">Credit Card</option>
              </select>
            </div>
          </section>

          {/* Order Summary */}
          <section className="rounded-2xl border border-violet-100 bg-white/90 p-6 shadow-sm backdrop-blur-sm sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900">
              Order summary
            </h2>

            <div className="mt-5 space-y-3 text-sm">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between text-slate-600"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium text-slate-900">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="my-2 h-px bg-slate-200" />

              <div className="flex items-center justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">
                  ₹{total.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Shipping</span>
                <span className="font-medium text-slate-900">
                  ₹{shippingPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Tax (10%)</span>
                <span className="font-medium text-slate-900">
                  ₹{taxPrice.toFixed(2)}
                </span>
              </div>

              <div className="my-2 h-px bg-slate-200" />

              <div className="flex items-center justify-between text-base font-semibold text-slate-900">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-lg bg-emerald-600 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Processing...' : 'Place order'}
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
