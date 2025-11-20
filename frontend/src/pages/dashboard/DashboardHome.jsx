import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Eye,
  Star,
  TrendingUp,
  Calendar,
  Heart,
  ArrowUpRight,
  ChevronRight,
  Sparkles,
  Users,
  Route,
  Award,
  Activity,
  Clock,
  Navigation
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
      title: 'Total Destinations',
      value: stats.totalDestinations,
      icon: MapPin,
      color: 'blue',
      change: '+12.5%',
      trend: 'up',
      description: 'Available locations'
    },
    {
      title: 'Active Trips',
      value: 3,
      icon: Route,
      color: 'purple',
      change: '+8.2%',
      trend: 'up',
      description: 'Ongoing journeys'
    },
    {
      title: 'Total Visitors',
      value: '1.2K',
      icon: Users,
      color: 'green',
      change: '+23.1%',
      trend: 'up',
      description: 'This month'
    },
    {
      title: 'Avg. Rating',
      value: '4.8',
      icon: Award,
      color: 'orange',
      change: '+0.3',
      trend: 'up',
      description: 'User satisfaction'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'New destination added',
      location: 'Hundru Falls',
      time: '2 hours ago',
      icon: MapPin,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      action: 'Trip completed',
      location: 'Ranchi to Netarhat',
      time: '5 hours ago',
      icon: Route,
      color: 'bg-green-500'
    },
    {
      id: 3,
      action: 'New review received',
      location: 'Jagannath Temple',
      time: '1 day ago',
      icon: Star,
      color: 'bg-yellow-500'
    }
  ];

  const upcomingTrips = [
    {
      id: 1,
      name: 'Ranchi Heritage Tour',
      date: 'Dec 20, 2025',
      destinations: 3,
      duration: '2 days',
      image: null
    },
    {
      id: 2,
      name: 'Netarhat Sunset Experience',
      date: 'Dec 25, 2025',
      destinations: 2,
      duration: '1 day',
      image: null
    }
  ];

  const quickStats = [
    { label: 'Favorites', value: 12, icon: Heart, color: 'text-rose-600' },
    { label: 'Reviews', value: 8, icon: Star, color: 'text-yellow-600' },
    { label: 'Photos', value: 24, icon: Eye, color: 'text-blue-600' }
  ];

  const quickActions = [
    {
      name: 'Plan New Trip',
      description: 'Create your perfect itinerary',
      icon: Calendar,
      gradient: 'from-blue-500 to-indigo-500',
      href: '/dashboard/trip-planner'
    },
    {
      name: 'Explore Destinations',
      description: 'Discover amazing places',
      icon: MapPin,
      gradient: 'from-emerald-500 to-teal-500',
      href: '/dashboard/destinations'
    },
    {
      name: 'Cultural Heritage',
      description: 'Learn about local culture',
      icon: Sparkles,
      gradient: 'from-purple-500 to-pink-500',
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
    <div className="min-h-screen bg-gray-50">
      {/* Top Section - Welcome Banner */}
      <div className="bg-white border-b border-gray-200 mb-6">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, Traveler!
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your adventures today
              </p>
            </div>
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                to="/dashboard/trip-planner"
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Plan Trip</span>
              </Link>
              <Link
                to="/dashboard/destinations"
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Explore
              </Link>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            {quickStats.map((stat) => (
              <div key={stat.label} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, index) => {
            const colorClasses = {
              blue: 'bg-blue-500 text-blue-600 bg-blue-50',
              purple: 'bg-purple-500 text-purple-600 bg-purple-50',
              green: 'bg-green-500 text-green-600 bg-green-50',
              orange: 'bg-orange-500 text-orange-600 bg-orange-50'
            };
            const colors = colorClasses[card.color].split(' ');
            
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${colors[2]}`}>
                    <card.icon className={`w-6 h-6 ${colors[1]}`} />
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-medium text-green-600">
                    <TrendingUp className="w-3 h-3" />
                    <span>{card.change}</span>
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{card.value}</p>
                  <p className="text-sm font-medium text-gray-900 mb-1">{card.title}</p>
                  <p className="text-xs text-gray-500">{card.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Popular Destinations */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Top Destinations</h2>
                    <p className="text-sm text-gray-600 mt-1">Most visited places this month</p>
                  </div>
                  <Link
                    to="/dashboard/destinations"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1"
                  >
                    <span>View all</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="p-6">
                {stats.recentDestinations.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-flex p-4 rounded-full bg-gray-100 mb-4">
                      <MapPin className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No destinations yet</h3>
                    <p className="text-gray-600 mb-6">Start exploring amazing places in Jharkhand</p>
                    <Link
                      to="/dashboard/destinations"
                      className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Explore Destinations
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {stats.recentDestinations.map((destination, index) => (
                      <motion.div
                        key={destination._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer"
                      >
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                          {destination.images?.[0]?.url ? (
                            <img
                              src={destination.images[0].url}
                              alt={destination.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <MapPin className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                            {destination.title}
                          </h4>
                          <p className="text-sm text-gray-600 truncate mt-1 flex items-center">
                            <Navigation className="w-3 h-3 mr-1" />
                            {destination.location}
                          </p>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <div className="flex items-center space-x-1 text-yellow-500">
                              <Star className="w-4 h-4 fill-yellow-500" />
                              <span className="text-sm font-bold text-gray-900">
                                {destination.rating?.average?.toFixed(1) || 'N/A'}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {destination.rating?.count || 0} reviews
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Upcoming Trips */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Upcoming Trips</h2>
                    <p className="text-sm text-gray-600 mt-1">Your planned adventures</p>
                  </div>
                  <Link
                    to="/dashboard/my-trips"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    View all
                  </Link>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {upcomingTrips.map((trip) => (
                    <div
                      key={trip.id}
                      className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Route className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-semibold text-gray-900">{trip.name}</h4>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="w-3.5 h-3.5 mr-1" />
                            {trip.date}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-3.5 h-3.5 mr-1" />
                            {trip.destinations} stops
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3.5 h-3.5 mr-1" />
                            {trip.duration}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
                <p className="text-sm text-gray-600 mt-1">Start your journey</p>
              </div>
              <div className="p-4 space-y-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.name}
                    to={action.href}
                    className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <div className={`p-2.5 rounded-lg bg-gradient-to-br ${action.gradient} shadow-sm group-hover:shadow-md transition-shadow`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {action.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{action.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <p className="text-sm text-gray-600 mt-1">Latest updates</p>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${activity.color} flex-shrink-0`}>
                        <activity.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{activity.location}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Travel Stats */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <Award className="w-8 h-8" />
                <Activity className="w-6 h-6 opacity-50" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Travel Champion</h3>
              <p className="text-blue-100 text-sm mb-4">
                You've explored 8 destinations this year!
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <span className="text-sm">Next milestone</span>
                <span className="text-sm font-bold">10 places</span>
              </div>
              <div className="mt-2 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;