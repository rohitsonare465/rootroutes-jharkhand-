import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  MapPin,
  Calendar,
  Building,
  Heart,
  User,
  Settings,
  BarChart3,
  Compass,
  BookOpen,
  Plane,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Trip Planner', href: '/dashboard/trip-planner', icon: Calendar },
    { name: 'Destinations', href: '/dashboard/destinations', icon: MapPin },
    { name: 'Culture & Heritage', href: '/dashboard/culture', icon: BookOpen },
    { name: 'Hotels Booking', href: '/dashboard/hotels', icon: Building },
    { name: 'Travel Guide', href: '/dashboard/travel-guide', icon: Compass },
    { name: 'My Trips', href: '/dashboard/my-trips', icon: Plane },
    { name: 'Favorites', href: '/dashboard/favorites', icon: Heart },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-gray-900/50 backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-xl">
          {/* Logo */}
          <div className="flex items-center justify-center h-24 px-6">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-secondary-600 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg"></div>
                <div className="absolute inset-0 bg-white rounded-xl flex items-center justify-center border border-gray-100 z-10">
                  <MapPin className="w-5 h-5 text-primary-600" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary-700 to-secondary-700 bg-clip-text text-transparent">
                  RootRoutes
                </span>
                <p className="text-[10px] font-medium text-gray-400 tracking-widest uppercase ml-0.5">Jharkhand</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto scrollbar-hide">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group relative flex items-center px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-300
                    ${active
                      ? 'text-white shadow-glow-sm'
                      : 'text-gray-600 hover:bg-white/50 hover:text-primary-700'
                    }
                  `}
                >
                  {active && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl opacity-100 transition-opacity duration-300"></div>
                  )}
                  <Icon className={`
                    relative w-5 h-5 mr-3 transition-transform duration-300 z-10
                    ${active ? 'text-white scale-110' : 'text-gray-400 group-hover:text-primary-600 group-hover:scale-110'}
                  `} />
                  <span className={`relative z-10 ${active ? 'font-semibold' : ''}`}>{item.name}</span>

                  {active && (
                    <div className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full animate-pulse z-10"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="p-4 m-4 mt-auto rounded-2xl bg-gradient-to-br from-white/50 to-white/30 border border-white/40 shadow-sm">
            <div className="flex items-center space-x-3 mb-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center shadow-md ring-2 ring-white">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800 truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-xs font-semibold text-red-600 bg-red-50/50 hover:bg-red-50 rounded-lg transition-colors duration-200 border border-red-100"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;