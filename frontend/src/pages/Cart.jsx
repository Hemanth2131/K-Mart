// src/pages/Cart.jsx
import React from 'react';
import { ShoppingCart, Package, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = ({ navigate }) => {
  const { cart, updateQuantity, removeFromCart, total, isEmpty } = useCart();
  const { user } = useAuth();

  const shippingPrice = 10;
  const taxPrice = total * 0.1;
  const totalPrice = total + shippingPrice + taxPrice;

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10 font-sans">
        <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/60 px-8 py-12 text-center shadow-sm">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
            <ShoppingCart className="h-10 w-10 text-slate-300" />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Your cart is empty
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Add items to your cart to see them here and quickly review your order.
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
          >
            Start shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 font-sans sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Shopping cart
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Review your items and adjust quantities before checkout.
            </p>
          </div>
          <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-xs font-medium text-emerald-700">
              {cart.length}
            </span>
            <span>items in cart</span>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {cart.map((item) => (
              <div
                key={item._id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex gap-5">
                  {/* Product Image */}
                  <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Package className="h-10 w-10 text-slate-300" />
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-medium text-slate-900">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                          ₹{item.price} each
                        </p>
                      </div>
                      <div className="text-right text-sm font-semibold text-slate-900">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    {/* Quantity + Remove */}
                    <div className="mt-4 flex items-center gap-4">
                      <div className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-2 py-1">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="mx-2 min-w-[2rem] text-center text-sm font-medium text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="ml-auto inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-rose-600 transition hover:bg-rose-50"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Order summary
              </h2>

              <div className="mt-5 space-y-3 text-sm">
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
                onClick={() => {
                  if (!user) {
                    navigate('/login');
                  } else if (user.role === 'admin') {
                    alert('Admin cannot place orders');
                  } else {
                    navigate('/checkout');
                  }
                }}
                className="mt-6 w-full rounded-lg bg-emerald-600 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
              >
                {user ? 'Proceed to checkout' : 'Login to checkout'}
              </button>

              <button
                onClick={() => navigate('/')}
                className="mt-3 w-full rounded-lg border border-slate-200 bg-white py-2.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Continue shopping
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
