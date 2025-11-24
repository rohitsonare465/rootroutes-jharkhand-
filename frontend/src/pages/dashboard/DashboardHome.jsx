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
  Navigation,
  MoreHorizontal
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
      gradient: 'from-blue-500 to-blue-600',
      change: '+12.5%',
      trend: 'up',
      description: 'Available locations'
    },
    {
      title: 'Active Trips',
      value: 3,
      icon: Route,
      gradient: 'from-purple-500 to-purple-600',
      change: '+8.2%',
      trend: 'up',
      description: 'Ongoing journeys'
    },
    {
      title: 'Total Visitors',
      value: '1.2K',
      icon: Users,
      gradient: 'from-emerald-500 to-emerald-600',
      change: '+23.1%',
      trend: 'up',
      description: 'This month'
    },
    {
      title: 'Avg. Rating',
      value: stats.averageRating.toFixed(1),
      icon: Star,
      gradient: 'from-orange-500 to-orange-600',
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
    { label: 'Favorites', value: 12, icon: Heart, color: 'text-rose-500' },
    { label: 'Reviews', value: 8, icon: Star, color: 'text-yellow-500' },
    { label: 'Photos', value: 24, icon: Eye, color: 'text-blue-500' }
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
      <div className="space-y-6 px-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your platform.</p>
        </div>

        {/* Loading Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white/50 backdrop-blur-xl rounded-2xl shadow-sm border border-white/20 p-6 animate-pulse">
              <div className="flex items-center">
                <div className="p-3 rounded-xl bg-gray-200 w-12 h-12"></div>
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
    <div className="space-y-8 px-6 pb-8">
      {/* Top Section - Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 to-secondary-600 shadow-lg text-white">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative px-8 py-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-display font-bold mb-2">
                Welcome back, Traveler!
              </h1>
              <p className="text-blue-100 text-lg max-w-xl">
                Your journey continues here. You have <span className="font-bold text-white">3 active trips</span> and <span className="font-bold text-white">12 new recommendations</span> waiting for you.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard/trip-planner"
                className="px-6 py-3 bg-white text-primary-600 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Plan Trip</span>
              </Link>
              <Link
                to="/dashboard/destinations"
                className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-xl font-bold hover:bg-white/30 transition-all flex items-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                <span>Explore</span>
              </Link>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
            {quickStats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-blue-100">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-glass-sm hover:shadow-glass transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg text-white group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center space-x-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                <TrendingUp className="w-3 h-3" />
                <span>{card.change}</span>
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{card.value}</p>
              <p className="text-sm font-semibold text-gray-600 mb-1">{card.title}</p>
              <p className="text-xs text-gray-400">{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-8">
          {/* Popular Destinations */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-glass-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Top Destinations</h2>
                <p className="text-sm text-gray-500 mt-1">Most visited places this month</p>
              </div>
              <Link
                to="/dashboard/destinations"
                className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
              >
                <span>View all</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="p-6">
              {stats.recentDestinations.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex p-4 rounded-full bg-gray-50 mb-4">
                    <MapPin className="h-10 w-10 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No destinations yet</h3>
                  <p className="text-gray-500 mb-6">Start exploring amazing places in Jharkhand</p>
                  <Link
                    to="/dashboard/destinations"
                    className="inline-flex items-center px-5 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30"
                  >
                    Explore Destinations
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {stats.recentDestinations.map((destination, index) => (
                    <motion.div
                      key={destination._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-lg transition-all cursor-pointer"
                    >
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 shadow-sm group-hover:shadow-md transition-all">
                        {destination.images?.[0]?.url ? (
                          <img
                            src={destination.images[0].url}
                            alt={destination.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-50">
                            <MapPin className="h-8 w-8 text-gray-300" />
                          </div>
                        )}
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-lg text-xs font-bold text-gray-900 shadow-sm flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          {destination.rating?.average?.toFixed(1) || 'N/A'}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 py-2">
                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors truncate">
                          {destination.title}
                        </h4>
                        <p className="text-sm text-gray-500 truncate mt-1 flex items-center gap-1">
                          <Navigation className="w-3.5 h-3.5" />
                          {destination.location}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                            {destination.rating?.count || 0} reviews
                          </span>
                          <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-lg">
                            Popular
                          </span>
                        </div>
                      </div>
                      <div className="px-4">
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Trips */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-glass-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Upcoming Trips</h2>
                <p className="text-sm text-gray-500 mt-1">Your planned adventures</p>
              </div>
              <Link
                to="/dashboard/my-trips"
                className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
              >
                View all
              </Link>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {upcomingTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="flex items-center gap-5 p-4 rounded-2xl border border-gray-100 bg-white/50 hover:bg-white hover:shadow-lg hover:border-primary-100 transition-all cursor-pointer group"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform">
                      <Route className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{trip.name}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          {trip.date}
                        </span>
                        <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          {trip.destinations} stops
                        </span>
                        <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          {trip.duration}
                        </span>
                      </div>
                    </div>
                    <div className="text-gray-300 group-hover:text-primary-600 transition-colors">
                      <MoreHorizontal className="w-6 h-6" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-glass-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              <p className="text-sm text-gray-500 mt-1">Start your journey</p>
            </div>
            <div className="p-4 space-y-3">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  to={action.href}
                  className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-white transition-all border border-transparent hover:border-gray-100 hover:shadow-lg"
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${action.gradient} shadow-lg text-white group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {action.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{action.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-glass-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <p className="text-sm text-gray-500 mt-1">Latest updates</p>
            </div>
            <div className="p-6">
              <div className="relative pl-2 space-y-8">
                {/* Timeline Line */}
                <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-100"></div>

                {recentActivity.map((activity) => (
                  <div key={activity.id} className="relative flex items-start gap-4 group">
                    <div className={`relative z-10 p-2 rounded-full ${activity.color} shadow-lg ring-4 ring-white`}>
                      <activity.icon className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="text-sm font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{activity.action}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{activity.location}</p>
                      <p className="text-[10px] font-medium text-gray-400 mt-1 uppercase tracking-wide">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Travel Stats Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl p-8">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-secondary-500/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                  <Award className="w-8 h-8 text-yellow-400" />
                </div>
                <Activity className="w-6 h-6 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Travel Champion</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                You've explored <span className="text-white font-bold">8 destinations</span> this year! Keep it up to reach the next tier.
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-gray-400">
                  <span>Progress</span>
                  <span className="text-white">80%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 w-4/5 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-gray-500">Next: 10 places</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;