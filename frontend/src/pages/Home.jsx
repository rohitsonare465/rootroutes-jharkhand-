import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  Users,
  Camera,
  Mountain,
  TreePine,
  Waves,
  ArrowRight,
  Sparkles,
  Award,
  TrendingUp,
  Globe,
  X
} from 'lucide-react';
import { destinationsAPI } from '../services/api';

const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const availableTags = [
    { name: 'waterfall', icon: Waves, color: 'bg-blue-500' },
    { name: 'temple', icon: Mountain, color: 'bg-orange-500' },
    { name: 'trek', icon: Mountain, color: 'bg-emerald-500' },
    { name: 'wildlife', icon: TreePine, color: 'bg-green-500' },
    { name: 'cultural', icon: Users, color: 'bg-purple-500' },
    { name: 'historical', icon: Award, color: 'bg-indigo-500' },
    { name: 'adventure', icon: Mountain, color: 'bg-red-500' },
    { name: 'nature', icon: TreePine, color: 'bg-green-600' },
    { name: 'photography', icon: Camera, color: 'bg-gray-500' },
    { name: 'family-friendly', icon: Users, color: 'bg-amber-500' },
  ];

  const fetchDestinations = React.useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        limit: 12,
        ...(searchTerm && { search: searchTerm }),
        ...(selectedTags.length > 0 && { tags: selectedTags.join(',') })
      };

      const response = await destinationsAPI.getAll(params);
      setDestinations(response.data.data.destinations || []);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedTags]);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  const handleTagToggle = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const getDefaultImage = (index = 0) => {
    const images = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&h=600&fit=crop',
    ];
    return images[index % images.length];
  };

  const DestinationCard = ({ destination, index }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.3 });

    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden"
      >
        <Link to={`/destinations/${destination._id}`} className="block h-full">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={destination.images?.[0]?.url || getDefaultImage(index)}
              alt={destination.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.src = getDefaultImage(index);
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            {/* Rating Badge */}
            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1 shadow-sm">
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
              <span className="text-xs font-semibold text-gray-800">
                {destination.rating?.average?.toFixed(1) || 'New'}
              </span>
            </div>
          </div>

          <div className="p-5">
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 mb-2">
                {destination.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {destination.description}
              </p>
            </div>

            <div className="flex items-center text-gray-500 text-sm mb-4">
              <MapPin className="h-4 w-4 mr-1 text-blue-500" />
              <span className="truncate">{destination.location}</span>
            </div>

            {/* Tags */}
            {destination.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {destination.tags.slice(0, 2).map(tag => {
                  const tagInfo = availableTags.find(t => t.name === tag);
                  return (
                    <span
                      key={tag}
                      className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium text-white ${tagInfo?.color || 'bg-gray-500'}`}
                    >
                      {tag.replace('-', ' ')}
                    </span>
                  );
                })}
                {destination.tags.length > 2 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                    +{destination.tags.length - 2}
                  </span>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center space-x-3 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{destination.duration || '1 day'}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  <span>{destination.rating?.count || 0}</span>
                </div>
              </div>

              <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                <span>View</span>
                <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  const LoadingCard = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gray-200" />
      <div className="p-5">
        <div className="h-5 bg-gray-200 rounded mb-2" />
        <div className="h-4 bg-gray-200 rounded mb-3 w-3/4" />
        <div className="h-4 bg-gray-200 rounded mb-4 w-1/2" />
        <div className="flex space-x-2 mb-4">
          <div className="h-6 w-16 bg-gray-200 rounded" />
          <div className="h-6 w-16 bg-gray-200 rounded" />
        </div>
        <div className="flex justify-between pt-2 border-t border-gray-100">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-12 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-emerald-600/10"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-4 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Discover Jharkhand's Hidden Treasures
              </motion.div>

              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8">
                <span className="block">Journey Into</span>
                <span className="block bg-gradient-to-r from-blue-600 via-emerald-600 to-indigo-600 bg-clip-text text-transparent">
                  Incredible
                </span>
                <span className="block">Adventures</span>
              </h1>

              <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Embark on extraordinary journeys through Jharkhand's pristine landscapes.
                From cascading waterfalls to ancient tribal heritage, every destination tells a story.
              </p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              >
                <Link
                  to="/destinations"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Globe className="h-5 w-5 mr-2" />
                  Explore Destinations
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-full border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Join Community
                </Link>
              </motion.div>

              {/* Enhanced Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="max-w-2xl mx-auto mb-12"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl blur opacity-20"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-2xl">
                    <div className="relative">
                      <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                      <input
                        type="text"
                        placeholder="Where do you want to explore today?"
                        className="w-full pl-16 pr-24 py-5 bg-transparent border-0 focus:ring-0 text-gray-900 placeholder-gray-500 text-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-3 rounded-xl transition-all duration-300 ${showFilters
                          ? 'bg-blue-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                      >
                        <Filter className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="grid grid-cols-3 gap-8 max-w-md mx-auto"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {destinations.length}+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Destinations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    50K+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Travelers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                    4.8
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Rating</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Tags Section */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border-y border-gray-200 py-8"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filter by Category</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {/* eslint-disable-next-line no-unused-vars */}
                {availableTags.map(({ name, icon: TagIcon, color }) => (
                  <button
                    key={name}
                    onClick={() => handleTagToggle(name)}
                    className={`flex items-center space-x-3 p-3 rounded-xl border transition-all duration-200 ${selectedTags.includes(name)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white hover:border-gray-300 text-gray-600'
                      }`}
                  >
                    <div className={`p-2 rounded-lg ${color} text-white`}>
                      <TagIcon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">{name.replace('-', ' ')}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Active Filters */}
          {selectedTags.length > 0 && (
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">Active filters:</span>
                {selectedTags.map(tag => {
                  const tagInfo = availableTags.find(t => t.name === tag);
                  return (
                    <span
                      key={tag}
                      className={`inline-flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium text-white ${tagInfo?.color || 'bg-gray-500'}`}
                    >
                      <span>{tag.replace('-', ' ')}</span>
                      <button
                        onClick={() => handleTagToggle(tag)}
                        className="hover:bg-white/20 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {searchTerm || selectedTags.length > 0 ? 'Search Results' : 'Popular Destinations'}
              </h2>
              {destinations.length > 0 && (
                <p className="text-gray-600 mt-1">{destinations.length} destinations found</p>
              )}
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <LoadingCard key={index} index={index} />
              ))}
            </div>
          ) : destinations.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No destinations found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or remove some filters.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedTags([]);
                  }}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {destinations.map((destination, index) => (
                <DestinationCard
                  key={destination._id}
                  destination={destination}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;