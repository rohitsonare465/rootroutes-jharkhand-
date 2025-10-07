import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, Star, Clock, Users, Camera, Mountain, TreePine, Waves, ChevronDown, ArrowRight, Sparkles, Heart, Award, TrendingUp, Globe } from 'lucide-react';
import { destinationsAPI } from '../services/api';

const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const availableTags = [
    { name: 'waterfall', icon: Waves, color: 'from-blue-400 to-cyan-400' },
    { name: 'temple', icon: Mountain, color: 'from-amber-400 to-orange-400' },
    { name: 'trek', icon: Mountain, color: 'from-emerald-400 to-teal-400' },
    { name: 'wildlife', icon: TreePine, color: 'from-green-400 to-emerald-400' },
    { name: 'cultural', icon: Users, color: 'from-purple-400 to-pink-400' },
    { name: 'historical', icon: Award, color: 'from-indigo-400 to-purple-400' },
    { name: 'adventure', icon: Mountain, color: 'from-red-400 to-pink-400' },
    { name: 'nature', icon: TreePine, color: 'from-green-400 to-blue-400' },
    { name: 'photography', icon: Camera, color: 'from-gray-400 to-gray-600' },
    { name: 'family-friendly', icon: Users, color: 'from-yellow-400 to-amber-400' },
    { name: 'offbeat', icon: Sparkles, color: 'from-violet-400 to-purple-400' },
    { name: 'religious', icon: Mountain, color: 'from-orange-400 to-red-400' },
    { name: 'tribal', icon: Users, color: 'from-emerald-400 to-green-400' },
    { name: 'forest', icon: TreePine, color: 'from-green-400 to-emerald-400' },
    { name: 'hill-station', icon: Mountain, color: 'from-blue-400 to-green-400' },
    { name: 'river', icon: Waves, color: 'from-blue-400 to-teal-400' },
    { name: 'cave', icon: Mountain, color: 'from-gray-400 to-stone-400' }
  ];

  useEffect(() => {
    fetchDestinations();
  }, [searchTerm, selectedTags]);

  const fetchDestinations = async () => {
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
  };

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
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    ];
    return images[index % images.length];
  };

  const DestinationCard = ({ destination, index }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.3 });
    
    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group"
      >
        <Link
          to={`/destinations/${destination._id}`}
          className="block card-premium overflow-hidden h-full"
        >
          <div className="relative overflow-hidden aspect-[4/3]">
            <motion.img
              src={destination.images?.[0]?.url || getDefaultImage(index)}
              alt={destination.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              onError={(e) => {
                e.target.src = getDefaultImage(index);
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Rating Badge */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 shadow-lg"
            >
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-semibold text-gray-800">
                {destination.rating?.average?.toFixed(1) || 'New'}
              </span>
            </motion.div>
            
            {/* Quick View Button */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-3">
                <Play className="h-6 w-6 text-white" />
              </div>
            </motion.div>
          </div>
          
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors duration-200 line-clamp-2">
                {destination.title}
              </h3>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {destination.description}
            </p>
            
            <div className="flex items-center text-gray-500 text-sm mb-4">
              <MapPin className="h-4 w-4 mr-2 text-primary-500" />
              <span className="line-clamp-1">{destination.location}</span>
            </div>
            
            {/* Tags */}
            {destination.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {destination.tags.slice(0, 3).map(tag => {
                  const tagInfo = availableTags.find(t => t.name === tag);
                  return (
                    <span
                      key={tag}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${tagInfo?.color || 'from-gray-400 to-gray-500'} text-white shadow-sm`}
                    >
                      {tag.replace('-', ' ')}
                    </span>
                  );
                })}
                {destination.tags.length > 3 && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    +{destination.tags.length - 3}
                  </span>
                )}
              </div>
            )}
            
            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{destination.duration || '1 day'}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{destination.rating?.count || 0}</span>
                </div>
              </div>
              
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center text-primary-600 font-medium text-sm"
              >
                <span>Explore</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </motion.div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  const LoadingCard = ({ index }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      className="card-premium overflow-hidden animate-pulse"
    >
      <div className="aspect-[4/3] bg-gray-200" />
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded mb-3" />
        <div className="h-4 bg-gray-200 rounded mb-2" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
        <div className="flex space-x-2 mb-4">
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
        </div>
        <div className="flex justify-between">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background with Parallax */}
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />
          <div className="absolute inset-0 bg-hero-pattern opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </motion.div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.sin(i) * 10, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'linear',
              }}
              className={`absolute w-2 h-2 bg-white/20 rounded-full`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
            />
          ))}
        </div>
        
        {/* Hero Content */}
        <motion.div 
          style={{ opacity }}
          className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover
              <br />
              <span className="gradient-text bg-gradient-to-r from-white via-primary-200 to-accent-300 bg-clip-text text-transparent">
                Jharkhand
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Embark on extraordinary journeys through pristine waterfalls, ancient temples, 
              and untouched wilderness. Experience the soul of India's hidden gem.
            </motion.p>
            
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <div className="glass-morphism p-2 rounded-2xl">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Where would you like to explore?"
                      className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-white/70 focus:outline-none text-lg"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowFilters(!showFilters)}
                    className="p-4 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
                  >
                    <Filter className="h-5 w-5 text-white" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg"
                  >
                    Search
                  </motion.button>
                </div>
              </div>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex justify-center items-center space-x-8 text-white/80"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{destinations.length}+</div>
                <div className="text-sm">Destinations</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-sm">Travelers</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.8</div>
                <div className="text-sm">Rating</div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="h-8 w-8 text-white/60" />
          </motion.div>
        </motion.div>
      </section>
      
      {/* Filter Tags Section */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border-b border-gray-200 py-8"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-900">Filter by Experience</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {availableTags.map(({ name, icon: Icon, color }) => (
                  <motion.button
                    key={name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTagToggle(name)}
                    className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedTags.includes(name)
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 bg-white hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <div className={`p-3 rounded-full mb-2 bg-gradient-to-r ${color}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">{name.replace('-', ' ')}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Featured Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Curated experiences that showcase the best of Jharkhand's natural beauty and cultural heritage
            </p>
            
            {selectedTags.length > 0 && (
              <div className="mt-6 flex justify-center">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-500">Filtered by:</span>
                  {selectedTags.map(tag => {
                    const tagInfo = availableTags.find(t => t.name === tag);
                    return (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${tagInfo?.color || 'from-gray-400 to-gray-500'} text-white`}
                      >
                        {tag.replace('-', ' ')}
                        <button 
                          onClick={() => handleTagToggle(tag)}
                          className="ml-2 hover:bg-white/20 rounded-full p-0.5"
                        >
                          ×
                        </button>
                      </motion.span>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>

          {/* Results */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, index) => (
                <LoadingCard key={index} index={index} />
              ))}
            </div>
          ) : destinations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No destinations found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or remove some filters to see more results.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedTags([]);
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-between items-center mb-8"
              >
                <div className="flex items-center space-x-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {searchTerm || selectedTags.length > 0 ? 'Search Results' : 'Popular Destinations'}
                  </h3>
                  <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                    {destinations.length} found
                  </span>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {destinations.map((destination, index) => (
                  <DestinationCard 
                    key={destination._id} 
                    destination={destination} 
                    index={index}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
