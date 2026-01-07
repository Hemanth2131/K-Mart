import React, { useState } from 'react';
import { ShoppingCart, LogOut, Menu, X, User, LayoutGrid, ClipboardList, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = ({ navigate = (path) => console.log('Navigate to:', path) }) => {
  const { user, logout, isAdmin } = useAuth();
  const { count } = useCart();
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenu(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Increased height to h-20 for a more prominent look */}
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation('/')}
              className="group flex items-center gap-2"
            >
              <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                <span className="text-white font-black text-xl">K</span>
              </div>
              <span className="text-2xl font-extrabold tracking-tighter text-white sm:text-3xl">
                MART<span className="text-indigo-500">.</span>
              </span>
            </button>
          </div>

          {/* DESKTOP NAVIGATION - Beautifully Spaced */}
          <nav className="hidden lg:flex items-center bg-white/5 rounded-2xl p-1.5 border border-white/5">
            <NavButton onClick={() => handleNavigation('/')} icon={<LayoutGrid size={18} />}>
              Shop
            </NavButton>

            {user && !isAdmin && (
              <>
                <NavButton onClick={() => handleNavigation('/orders')} icon={<ClipboardList size={18} />}>
                  Orders
                </NavButton>
                <NavButton onClick={() => handleNavigation('/profile')} icon={<User size={18} />}>
                  Account
                </NavButton>
              </>
            )}

            {isAdmin && (
              <>
                <NavButton onClick={() => handleNavigation('/admin/products')} icon={<LayoutGrid size={18} />}>
                  Inventory
                </NavButton>
                <NavButton onClick={() => handleNavigation('/admin/orders')} icon={<ShieldCheck size={18} />}>
                  Management
                </NavButton>
              </>
            )}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">
            {/* CART ICON */}
            {user && !isAdmin && (
              <button
                onClick={() => handleNavigation('/cart')}
                className="relative p-3 rounded-xl bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-all border border-white/5 group"
              >
                <ShoppingCart className="w-6 h-6" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-indigo-500 rounded-full text-[10px] font-black flex items-center justify-center text-white ring-4 ring-[#0F172A]">
                    {count}
                  </span>
                )}
              </button>
            )}

            {/* AUTH SECTION */}
            <div className="h-8 w-[1px] bg-white/10 hidden sm:block mx-2" />

            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Welcome</span>
                  <span className="text-sm font-semibold text-white leading-none">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="group p-3 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white transition-all duration-300 border border-rose-500/20"
                >
                  <LogOut className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavigation('/login')}
                className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all active:scale-95"
              >
                Sign In
              </button>
            )}

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden p-3 rounded-xl bg-white/5 text-slate-300 border border-white/5"
            >
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="lg:hidden bg-[#0F172A] border-t border-white/10 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-6 gap-3">
            <MobileNavButton onClick={() => handleNavigation('/')}>Storefront</MobileNavButton>
            {user && (
              <>
                <MobileNavButton onClick={() => handleNavigation('/orders')}>My Orders</MobileNavButton>
                <MobileNavButton onClick={() => handleNavigation('/profile')}>Profile Settings</MobileNavButton>
              </>
            )}
            {isAdmin && (
              <>
                <MobileNavButton onClick={() => handleNavigation('/admin/products')}>Admin Dashboard</MobileNavButton>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

// Helper Components for clean code structure
const NavButton = ({ children, onClick, icon }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 px-5 py-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all font-semibold text-sm tracking-wide"
  >
    {icon}
    {children}
  </button>
);

const MobileNavButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left p-4 rounded-2xl bg-white/5 text-slate-200 font-bold hover:bg-indigo-600/20 hover:text-indigo-400 transition-all border border-white/5"
  >
    {children}
  </button>
);

export default Header;