import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Toast from '../components/Toast';
import { Mail, Lock, User, ArrowLeftRight } from 'lucide-react';

const Login = ({ navigate }) => {
  const { login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const { data } = await api.post(endpoint, payload);

      login({
        ...data.user,
        token: data.token,
      });

      setToast({
        message: `Welcome ${data.user.name}!`,
        type: 'success',
      });

      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      setToast({
        message: error.response?.data?.message || 'Authentication failed',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center px-4 py-12 font-sans">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="w-full max-w-md">
        {/* Clean Card */}
        <div className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-xl rounded-2xl p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center shadow-lg">
              <div className="w-10 h-10 bg-slate-700/10 rounded-xl flex items-center justify-center">
                <div className="w-5 h-5 bg-gradient-to-r from-slate-600 to-slate-800 rounded" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
              Welcome back
            </h1>
            <p className="text-slate-600">Sign in to your account</p>
          </div>

          {/* Toggle */}
          <div className="mb-8">
            <div className="relative mx-auto max-w-sm">
              <div className="bg-slate-100/80 rounded-2xl p-1 shadow-sm backdrop-blur-sm">
                <div
                  className={`relative flex h-12 items-center justify-between rounded-xl p-1 transition-all duration-300 ${
                    isLogin
                      ? 'bg-slate-200'
                      : 'bg-slate-300'
                  }`}
                >
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`relative flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      isLogin
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`relative flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      !isLogin
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    Register
                  </button>
                  <div
                    className={`absolute top-1.5 h-9 w-1/2 rounded-xl shadow-sm transition-all duration-300 bg-white ${
                      isLogin ? 'left-1' : 'right-1'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            {!isLogin && (
              <div>
                <label className="mb-2.5 block text-sm font-semibold text-slate-700">
                  Full name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-11 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300 hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="mb-2.5 block text-sm font-semibold text-slate-700">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-11 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300 hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="mb-2.5 block text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-11 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300 hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full rounded-xl bg-slate-900 py-4 px-8 text-sm font-bold text-white shadow-lg transition-all hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-slate-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing in...
                </>
              ) : isLogin ? (
                'Sign in'
              ) : (
                'Create account'
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-200/50 text-center">
            <p className="text-sm text-slate-600">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="font-semibold text-slate-800 hover:text-slate-900 transition-colors"
              >
                {isLogin ? 'Create one' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
