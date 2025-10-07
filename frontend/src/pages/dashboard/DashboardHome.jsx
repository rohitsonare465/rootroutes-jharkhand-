import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Users,
  Eye,
  Star,
  TrendingUp,
  Plus,
  Calendar,
  Activity,
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { destinationsAPI } from '../../services/api';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalDestinations: 0,
    totalUsers: 0,
    totalViews: 0,
    averageRating: 0,
    recentDestinations: [],
    loading: true
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setStats(prev => ({ ...prev, loading: true }));
      
      // Fetch destinations data
      const destinationsResponse = await destinationsAPI.getAll({ limit: 50 });
      const destinations = destinationsResponse.data.data.destinations || [];
      
      // Calculate stats
      const totalDestinations = destinations.length;
      const totalViews = destinations.reduce((sum, dest) => sum + (dest.rating?.count || 0), 0);
      const averageRating = destinations.length > 0 
        ? destinations.reduce((sum, dest) => sum + (dest.rating?.average || 0), 0) / destinations.length
        : 0;
      
      // Get recent destinations (last 5)
      const recentDestinations = destinations.slice(0, 5);
      
      setStats({
        totalDestinations,
        totalUsers: 156, // Mock data - you can fetch from users API
        totalViews,
        averageRating,
        recentDestinations,
        loading: false
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  const statCards = [
    {
      name: 'Available Destinations',
      value: stats.totalDestinations,
      icon: MapPin,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      name: 'My Trips',
      value: 3, // Mock data for user trips
      icon: Calendar,
      color: 'bg-green-500',
      change: '+2',
      changeType: 'positive'
    },
    {
      name: 'Places Visited',
      value: 8, // Mock data for user visits
      icon: Eye,
      color: 'bg-purple-500',
      change: '+3',
      changeType: 'positive'
    },
    {
      name: 'Favorites',
      value: 12, // Mock data for user favorites
      icon: Star,
      color: 'bg-yellow-500',
      change: '+4',
      changeType: 'positive'
    }
  ];

  const quickActions = [
    {
      name: 'Plan New Trip',
      description: 'Create your perfect itinerary',
      icon: Calendar,
      color: 'bg-blue-600',
      href: '/dashboard/trip-planner'
    },
    {
      name: 'Explore Destinations',
      description: 'Discover amazing places',
      icon: MapPin,
      color: 'bg-green-600',
      href: '/dashboard/destinations'
    },
    {
      name: 'Cultural Heritage',
      description: 'Learn about local culture',
      icon: Activity,
      color: 'bg-purple-600',
      href: '/dashboard/culture'
    }
  ];

  if (stats.loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your platform.</p>
        </div>
        
        {/* Loading Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-gray-200 w-12 h-12"></div>
                <div className="ml-4 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-2"
        >
          Welcome to RootRoutes Dashboard
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600"
        >
          Plan your perfect journey through the beautiful landscapes of Jharkhand
        </motion.p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600 font-medium">{stat.change} from last month</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                to={action.href}
                className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group"
              >
                <div className={`p-2 rounded-lg ${action.color}`}>
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">{action.name}</p>
                  <p className="text-xs text-gray-500">{action.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Destinations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Popular Destinations</h3>
            <Link
              to="/dashboard/destinations"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View all
            </Link>
          </div>
          
          {stats.recentDestinations.length === 0 ? (
            <div className="text-center py-8">
              <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">No destinations available</p>
              <Link
                to="/dashboard/destinations"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Explore destinations
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {stats.recentDestinations.map((destination) => (
                <div
                  key={destination._id}
                  className="flex items-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                    {destination.images?.[0]?.url ? (
                      <img
                        src={destination.images[0].url}
                        alt={destination.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {destination.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {destination.location}
                    </p>
                  </div>
                  <div className="ml-3 flex items-center space-x-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                      <span>{destination.rating?.average?.toFixed(1) || 'N/A'}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 text-gray-400 mr-1" />
                      <span>{destination.rating?.count || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Activity Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Activity className="h-5 w-5 mr-2" />
          Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-900">Welcome to RootRoutes Dashboard!</p>
              <p className="text-xs text-gray-500">Start exploring amazing destinations in Jharkhand</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-900">Plan your first trip</p>
              <p className="text-xs text-gray-500">Use our trip planner to create amazing itineraries</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-900">Discover cultural heritage</p>
              <p className="text-xs text-gray-500">Learn about Jharkhand's rich tribal culture</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;