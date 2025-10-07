import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import DashboardHome from './pages/dashboard/DashboardHome';
import DestinationsManagement from './pages/dashboard/DestinationsManagement';
import TripPlanner from './pages/dashboard/TripPlanner';
import CultureHeritage from './pages/dashboard/CultureHeritage';
import HotelsBooking from './pages/dashboard/HotelsBooking';
import TravelGuide from './pages/dashboard/TravelGuide';
import MyTrips from './pages/dashboard/MyTrips';
import Favorites from './pages/dashboard/Favorites';
import DashboardProfile from './pages/dashboard/DashboardProfile';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes with Navbar */}
          <Route path="/*" element={
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/destinations" element={<Destinations />} />
                  <Route path="/destinations/:id" element={<DestinationDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </main>
            </div>
          } />
          
          {/* User Dashboard Routes - Available to all authenticated users */}
          <Route path="/dashboard/*" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  <Route index element={<DashboardHome />} />
                  <Route path="trip-planner" element={<TripPlanner />} />
                  <Route path="destinations" element={<Destinations />} />
                  <Route path="destinations/:id" element={<DestinationDetail />} />
                  <Route path="culture" element={<CultureHeritage />} />
                  <Route path="hotels" element={<HotelsBooking />} />
                  <Route path="travel-guide" element={<TravelGuide />} />
                  <Route path="my-trips" element={<MyTrips />} />
                  <Route path="favorites" element={<Favorites />} />
                  <Route path="profile" element={<DashboardProfile />} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          } />

          {/* Admin Dashboard Routes - Only for admin users */}
          <Route path="/admin/*" element={
            <AdminRoute>
              <DashboardLayout>
                <Routes>
                  <Route index element={<DashboardHome />} />
                  <Route path="destinations" element={<DestinationsManagement />} />
                  <Route path="destinations/new" element={<div>Add Destination Page</div>} />
                  <Route path="destinations/edit/:id" element={<div>Edit Destination Page</div>} />
                  <Route path="users" element={<div>User Management Page</div>} />
                  <Route path="analytics" element={<div>Analytics Page</div>} />
                  <Route path="settings" element={<div>Settings Page</div>} />
                </Routes>
              </DashboardLayout>
            </AdminRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
