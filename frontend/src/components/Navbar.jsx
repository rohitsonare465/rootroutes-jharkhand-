import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MapPin, User, LogOut, Compass, Mountain } from 'lucide-react';
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
    { path: '/', label: 'Home', icon: Mountain },
    { path: '/destinations', label: 'Destinations', icon: Compass },
  ];

  // Add dashboard link for authenticated users
  const authNavItems = isAuthenticated 
    ? [...navItems, { path: '/dashboard', label: 'Dashboard', icon: User }] 
    : navItems;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glassmorphism shadow-2xl' 
          : 'bg-gradient-to-r from-primary-600/90 via-primary-700/90 to-primary-800/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white/10 p-2 rounded-full border border-white/20">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-white tracking-tight">
                  RootRoutes
                </h1>
                <p className="text-xs text-white/80 -mt-1 tracking-wide">
                  Jharkhand Tourism
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {authNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 group ${
                    isActive 
                      ? 'text-white bg-white/20 shadow-lg' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white/10 rounded-xl border border-white/20"
                      initial={false}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="text-white/90 text-sm font-medium"
                >
                  Welcome, <span className="text-white font-semibold">{user?.name}</span>
                </motion.div>
                
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <User className="h-4 w-4" />
                  <span className="font-medium">Profile</span>
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-200 border border-white/20"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="font-medium">Logout</span>
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-xl text-white font-medium hover:bg-white/10 transition-all duration-200"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-6 py-2 rounded-xl bg-white text-primary-700 font-semibold hover:bg-white/90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-all duration-200"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden glassmorphism border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
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
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                        isActive 
                          ? 'text-white bg-white/20' 
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Auth */}
              <div className="pt-4 border-t border-white/10">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="px-4 py-2 text-white/90 text-sm">
                      Welcome, <span className="text-white font-semibold">{user?.name}</span>
                    </div>
                    
                    <Link 
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
                    >
                      <User className="h-5 w-5" />
                      <span className="font-medium">Profile</span>
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link 
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-4 py-3 rounded-xl text-center text-white font-medium hover:bg-white/10 transition-all duration-200"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-4 py-3 rounded-xl text-center bg-white text-primary-700 font-semibold hover:bg-white/90 transition-all duration-200"
                    >
                      Register
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
