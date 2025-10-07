import React, { useState } from 'react';
import { 
  Heart, 
  MapPin, 
  Star, 
  Calendar,
  Building,
  Camera,
  Trash2,
  Share,
  Filter,
  Grid,
  List,
  BookOpen
} from 'lucide-react';

const Favorites = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [activeFilter, setActiveFilter] = useState('all');

  const favorites = [
    {
      id: 1,
      type: 'destination',
      name: 'Netarhat Hill Station',
      location: 'Latehar District, Jharkhand',
      rating: 4.8,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      description: 'Known as the Queen of Chotanagpur, famous for sunrise and sunset views.',
      savedDate: '2024-10-01',
      category: 'Hill Station',
      price: null,
    },
    {
      id: 2,
      type: 'hotel',
      name: 'Ranchi Hill Resort',
      location: 'Ranchi',
      rating: 4.5,
      reviews: 324,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop',
      description: 'Luxury resort with modern amenities and beautiful hill views.',
      savedDate: '2024-09-28',
      category: 'Luxury Hotel',
      price: 3200,
    },
    {
      id: 3,
      type: 'destination',
      name: 'Hundru Falls',
      location: 'Ranchi',
      rating: 4.6,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop',
      description: 'Spectacular waterfall cascading from 320 feet, perfect for nature lovers.',
      savedDate: '2024-09-25',
      category: 'Waterfall',
      price: null,
    },
    {
      id: 4,
      type: 'cultural',
      name: 'Baidyanath Temple',
      location: 'Deoghar',
      rating: 4.9,
      reviews: 567,
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop',
      description: 'Sacred Jyotirlinga temple, one of the most important pilgrimage sites.',
      savedDate: '2024-09-20',
      category: 'Religious Site',
      price: null,
    },
    {
      id: 5,
      type: 'hotel',
      name: 'Betla Jungle Lodge',
      location: 'Betla National Park',
      rating: 4.2,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=400&h=300&fit=crop',
      description: 'Eco-friendly lodge in the heart of Betla National Park.',
      savedDate: '2024-09-18',
      category: 'Eco Resort',
      price: 4500,
    },
    {
      id: 6,
      type: 'destination',
      name: 'Rock Garden',
      location: 'Ranchi',
      rating: 4.3,
      reviews: 298,
      image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=300&fit=crop',
      description: 'Beautiful landscaped garden with rock formations and water features.',
      savedDate: '2024-09-15',
      category: 'Garden',
      price: null,
    },
  ];

  const categories = [
    { id: 'all', name: 'All Favorites', count: favorites.length },
    { id: 'destination', name: 'Destinations', count: favorites.filter(f => f.type === 'destination').length },
    { id: 'hotel', name: 'Hotels', count: favorites.filter(f => f.type === 'hotel').length },
    { id: 'cultural', name: 'Cultural Sites', count: favorites.filter(f => f.type === 'cultural').length },
  ];

  const filteredFavorites = activeFilter === 'all' 
    ? favorites 
    : favorites.filter(fav => fav.type === activeFilter);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'destination':
        return MapPin;
      case 'hotel':
        return Building;
      case 'cultural':
        return BookOpen;
      default:
        return Heart;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'destination':
        return 'bg-blue-100 text-blue-800';
      case 'hotel':
        return 'bg-purple-100 text-purple-800';
      case 'cultural':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
            <p className="mt-2 text-gray-600">Your saved destinations, hotels, and cultural sites</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <span className="text-sm text-gray-600">
              {filteredFavorites.length} item{filteredFavorites.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                activeFilter === category.id
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeFilter === category.id
                  ? 'bg-red-400 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Favorites Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((favorite) => {
            const TypeIcon = getTypeIcon(favorite.type);
            return (
              <div key={favorite.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                <div className="relative">
                  <img
                    src={favorite.image}
                    alt={favorite.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(favorite.type)}`}>
                      <TypeIcon className="w-3 h-3 mr-1" />
                      {favorite.type.charAt(0).toUpperCase() + favorite.type.slice(1)}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                      <Share className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors group-hover:bg-red-500 group-hover:text-white">
                      <Heart className="w-4 h-4 text-red-500 fill-current group-hover:text-white" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <button className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{favorite.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{favorite.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {favorite.location}
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{favorite.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      Saved {formatDate(favorite.savedDate)}
                    </div>
                    {favorite.price && (
                      <div className="text-lg font-semibold text-gray-900">
                        ₹{favorite.price.toLocaleString()}
                        <span className="text-xs text-gray-500 font-normal">/night</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{favorite.reviews} reviews</span>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-200">
            {filteredFavorites.map((favorite) => {
              const TypeIcon = getTypeIcon(favorite.type);
              return (
                <div key={favorite.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <img
                      src={favorite.image}
                      alt={favorite.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{favorite.name}</h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="w-4 h-4 mr-1" />
                              {favorite.location}
                            </div>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(favorite.type)}`}>
                              <TypeIcon className="w-3 h-3 mr-1" />
                              {favorite.type.charAt(0).toUpperCase() + favorite.type.slice(1)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{favorite.description}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          {favorite.price && (
                            <div className="text-right">
                              <div className="text-lg font-semibold text-gray-900">
                                ₹{favorite.price.toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-500">per night</div>
                            </div>
                          )}
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">{favorite.rating}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                              <Share className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredFavorites.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</h3>
          <p className="text-gray-600 mb-6">
            Start exploring and save your favorite destinations, hotels, and cultural sites!
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors">
            <Heart className="w-5 h-5 mr-2" />
            Explore Destinations
          </button>
        </div>
      )}
    </div>
  );
};

export default Favorites;
