import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 bg-[url('https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-gray-50/80 to-blue-50/50 backdrop-blur-sm"></div>

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="relative flex-1 flex flex-col overflow-hidden lg:ml-0 z-10">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content area */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none scrollbar-hide">
          <div className="py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;