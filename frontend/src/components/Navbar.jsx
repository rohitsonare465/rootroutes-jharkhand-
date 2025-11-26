import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  MapPin,
  User,
  LogOut,
  Compass,
  Mountain,
  Home,
  Settings,
  Bell,
  Search,
  ChevronDown,
  Star,
  Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/destinations', label: 'Destinations', icon: Globe },
  ];

  // Add dashboard link for authenticated users
  const authNavItems = isAuthenticated
    ? [...navItems, { path: '/dashboard', label: 'Dashboard', icon: Settings }]
    : navItems;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled
        ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-200/20'
        : 'bg-white/90 backdrop-blur-lg shadow-lg'
        }`}
    >
      {/* Premium Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-emerald-600/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-4"
          >
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="relative">
                {/* Animated Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-300" />
                <div className="relative bg-gradient-to-br from-blue-600 to-emerald-600 p-3 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Mountain className="h-7 w-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-emerald-800 bg-clip-text text-transparent">
                  RootRoutes
                </h1>
                <p className="text-xs text-gray-600 -mt-1 tracking-wide font-medium">
                  Discover Jharkhand
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {authNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 group ${isActive
                    ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/80'
                    }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'}`} />
                  <span className="text-sm">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg"
                      style={{ zIndex: -1 }}
                      initial={false}
                    />
                  )}
                  {/* Hover effect */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ zIndex: -1 }} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Enhanced Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-300"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                </motion.button>

                {/* User Menu */}
                <div className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-3 px-4 py-2 rounded-2xl bg-gray-50/80 hover:bg-gray-100/80 border border-gray-200/50 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-600">Explorer</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
                  </motion.button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-200/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="p-2">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200"
                      >
                        <User className="h-4 w-4" />
                        <span className="font-medium">Profile</span>
                      </Link>
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200"
                      >
                        <Settings className="h-4 w-4" />
                        <span className="font-medium">Dashboard</span>
                      </Link>
                      <hr className="my-2 border-gray-200" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50/80 transition-all duration-200"
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-6 py-3 rounded-2xl text-gray-700 font-semibold hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Enhanced Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 rounded-2xl text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-300 border border-gray-200/50"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50"
          >
            <div className="px-4 py-6 space-y-6">
              {/* Mobile Navigation */}
              <div className="space-y-2">
                {authNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-4 px-4 py-4 rounded-2xl font-semibold transition-all duration-300 ${isActive
                        ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/80'
                        }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Auth */}
              <div className="pt-4 border-t border-gray-200/50">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50/80 rounded-2xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-sm text-gray-600">Explorer</p>
                      </div>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-4 px-4 py-4 rounded-2xl text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-300"
                    >
                      <User className="h-5 w-5" />
                      <span className="font-medium">Profile</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-4 w-full px-4 py-4 rounded-2xl text-red-600 hover:bg-red-50/80 transition-all duration-300"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-4 py-4 rounded-2xl text-center text-gray-700 font-semibold hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-300"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-4 py-4 rounded-2xl text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-lg transition-all duration-300"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
