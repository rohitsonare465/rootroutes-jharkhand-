import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Building,
  MapPin,
  Search,
  Calendar,
  Users,
  Loader
} from 'lucide-react';
import { hotelsAPI } from '../../services/api';
import HotelCard from '../../components/HotelCard';

const HotelsBooking = () => {
  const [searchFilters, setSearchFilters] = useState({
    location: 'Ranchi',
    checkIn: '',
    checkOut: '',
    guests: 1,
    priceRange: 'all'
  });

  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initial load
  useEffect(() => {
    fetchHotels();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchHotels = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (searchFilters.location) params.query = searchFilters.location;
      if (searchFilters.checkIn) params.checkIn = searchFilters.checkIn;
      if (searchFilters.checkOut) params.checkOut = searchFilters.checkOut;
      if (searchFilters.guests) params.guests = searchFilters.guests;

      const response = await hotelsAPI.search(params);

      // Handle the API response structure variations
      let hotelData = [];
      if (response.data.data && Array.isArray(response.data.data)) {
        hotelData = response.data.data;
      } else if (Array.isArray(response.data)) {
        hotelData = response.data;
      }

      // If no hotels found or empty, we might want to show some suggestions or nothing
      setHotels(hotelData);
      setFilteredHotels(hotelData); // Initialize filtered list

    } catch (err) {
      console.error('Error fetching hotels:', err);
      // Fallback to empty array prevents crash, but error message is good
      setError(err.response?.data?.message || 'Failed to fetch hotels. Please try again or check your API configuration.');
    } finally {
      setLoading(false);
    }
  };

  // Filter effect
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredHotels(hotels);
    } else {
      // Simple client-side filtering logic based on categories
      // Since API doesn't return easy categories, we mock logic or filter by price/rating hints
      const filtered = hotels.filter(hotel => {
        if (activeCategory === 'luxury') return (hotel.rating >= 4.5 || (typeof hotel.price === 'number' && hotel.price > 4000));
        if (activeCategory === 'premium') return (hotel.rating >= 4.0 && hotel.rating < 4.5);
        if (activeCategory === 'business') return hotel.amenities?.includes('Wifi');
        if (activeCategory === 'heritage') return hotel.name.toLowerCase().includes('palace') || hotel.name.toLowerCase().includes('heritage');
        return true;
      });
      setFilteredHotels(filtered);
    }
  }, [activeCategory, hotels]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchHotels();
  };

  const categories = [
    { name: 'All', value: 'all' },
    { name: 'Luxury', value: 'luxury' },
    { name: 'Premium', value: 'premium' },
    { name: 'Heritage', value: 'heritage' },
    { name: 'Eco Resort', value: 'eco' },
    { name: 'Business', value: 'business' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hotels & Accommodation</h1>
            <p className="mt-2 text-gray-600">Find and book the perfect stay for your Jharkhand adventure</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Building className="w-4 h-4" />
              <span>{hotels.length} hotels available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Where are you going?"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchFilters.location}
                onChange={(e) => setSearchFilters({ ...searchFilters, location: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchFilters.checkIn}
                onChange={(e) => setSearchFilters({ ...searchFilters, checkIn: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchFilters.checkOut}
                onChange={(e) => setSearchFilters({ ...searchFilters, checkOut: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchFilters.guests}
                onChange={(e) => setSearchFilters({ ...searchFilters, guests: parseInt(e.target.value) })}
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-end">
            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
              <Search className="w-4 h-4 mr-2" />
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Categories Filter */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hotel Categories</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={`px-4 py-2 border rounded-full transition-colors text-sm font-medium ${activeCategory === category.value
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Hotels Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading hotels...</span>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-600 bg-white rounded-lg p-6">
          <p>{error}</p>
        </div>
      ) : hotels.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg p-6">
          <p className="text-gray-600">No hotels found. Try searching for a location.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel, index) => (
            <HotelCard key={hotel.id || index} hotel={hotel} />
          ))}
        </div>
      )}

      {/* Load More */}
      {!loading && hotels.length > 0 && (
        <div className="text-center">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg transition-colors font-medium">
            Load More Hotels
          </button>
        </div>
      )}
    </div>
  );
};

export default HotelsBooking;
