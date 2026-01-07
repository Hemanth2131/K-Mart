// src/App.jsx
import React from 'react';
import Profile from './pages/Profile';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import useRouter from './hooks/useRouter';
import Header from './components/Header';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Orders from './pages/Orders';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';

const AppContent = () => {
  const { route, navigate } = useRouter();

  const renderRoute = () => {
    // Home page
    if (route === '/' || route === '') {
      return <Home navigate={navigate} />;
    }

    // Product detail page
    if (route.startsWith('/product/')) {
      const productId = route.split('/')[2];
      return <ProductDetail id={productId} navigate={navigate} />;
    }

    // Cart page
    if (route === '/cart') {
      return <Cart navigate={navigate} />;
    }

    // Checkout page
    if (route === '/checkout') {
      return <Checkout navigate={navigate} />;
    }

    // Orders page
    if (route === '/orders') {
      return <Orders navigate={navigate} />;
    }

    // Login/Register page
    if (route === '/login') {
      return <Login navigate={navigate} />;
    }

    // Admin Products page
    if (route === '/admin/products') {
      return <AdminProducts navigate={navigate} />;
    }

    // Admin Orders page
    if (route === '/admin/orders') {
      return <AdminOrders navigate={navigate} />;
    }
    // Profile page
    if (route === '/profile') {
  return <Profile navigate={navigate} />;
}


    // 404 - Default to home
    return <Home navigate={navigate} />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header navigate={navigate} />
      <main>{renderRoute()}</main>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;