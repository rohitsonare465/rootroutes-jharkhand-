import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';

const Header = ({ setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-30 transition-all duration-300 border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-sm">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <button
              className="lg:hidden p-2 rounded-xl text-gray-500 hover:text-primary-600 hover:bg-primary-50 focus:outline-none transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Search */}
            <div className="relative hidden md:block group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-80 pl-10 pr-4 py-2.5 border-none rounded-xl bg-gray-50/50 focus:bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-100 sm:text-sm transition-all shadow-inner"
                placeholder="Search destinations, hotels, trips..."
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2.5 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200 group">
              <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button className="flex items-center space-x-3 pl-3 pr-1 py-1.5 rounded-xl hover:bg-white/50 transition-colors border border-transparent hover:border-white/40">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold text-gray-800 leading-none">Admin User</p>
                  <p className="text-[10px] font-medium text-gray-500 mt-1">Administrator</p>
                </div>
                <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-lg flex items-center justify-center shadow-md ring-2 ring-white/50">
                  <User className="w-4 h-4 text-white" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;