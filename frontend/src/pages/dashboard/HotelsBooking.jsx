import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, 
  Star, 
  MapPin, 
  Wifi, 
  Car, 
  Coffee,
  Users,
  Heart,
  Search,
  Filter,
  Calendar,
  ArrowRight
} from 'lucide-react';

const HotelsBooking = () => {
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    priceRange: 'all'
  });

  const hotels = [
    {
      id: 1,
      name: 'Ranchi Hill Resort',
      location: 'Ranchi',
      rating: 4.5,
      reviews: 324,
      price: 3200,
      originalPrice: 4000,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop',
      amenities: ['Wifi', 'Parking', 'Restaurant', 'Pool'],
      category: 'Luxury',
      availability: 'Available',
      discount: 20,
    },
    {
      id: 2,
      name: 'Netarhat View Hotel',
      location: 'Netarhat',
      rating: 4.3,
      reviews: 198,
      price: 2800,
      originalPrice: 3200,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
      amenities: ['Wifi', 'Restaurant', 'Garden', 'Heater'],
      category: 'Premium',
      availability: 'Available',
      discount: 12,
    },
    {
      id: 3,
      name: 'Deoghar Heritage Stay',
      location: 'Deoghar',
      rating: 4.7,
      reviews: 267,
      price: 2200,
      originalPrice: 2500,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop',
      amenities: ['Wifi', 'Temple View', 'Restaurant', 'AC'],
      category: 'Heritage',
      availability: 'Limited',
      discount: 12,
    },
    {
      id: 4,
      name: 'Betla Jungle Lodge',
      location: 'Betla National Park',
      rating: 4.2,
      reviews: 156,
      price: 4500,
      originalPrice: 5000,
      image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=400&h=300&fit=crop',
      amenities: ['Safari', 'Nature Walks', 'Bonfire', 'Restaurant'],
      category: 'Eco Resort',
      availability: 'Available',
      discount: 10,
    },
    {
      id: 5,
      name: 'Jamshedpur Business Hotel',
      location: 'Jamshedpur',
      rating: 4.1,
      reviews: 412,
      price: 2500,
      originalPrice: 2800,
      image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=400&h=300&fit=crop',
      amenities: ['Wifi', 'Business Center', 'Gym', 'Conference'],
      category: 'Business',
      availability: 'Available',
      discount: 11,
    },
    {
      id: 6,
      name: 'Hundru Falls Resort',
      location: 'Hundru Falls',
      rating: 4.4,
      reviews: 89,
      price: 3800,
      originalPrice: 4200,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
      amenities: ['Waterfall View', 'Adventure Sports', 'Restaurant', 'Parking'],
      category: 'Adventure',
      availability: 'Available',
      discount: 9,
    },
  ];

  const categories = [
    { name: 'All', value: 'all' },
    { name: 'Luxury', value: 'luxury' },
    { name: 'Premium', value: 'premium' },
    { name: 'Heritage', value: 'heritage' },
    { name: 'Eco Resort', value: 'eco' },
    { name: 'Business', value: 'business' },
  ];

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return Wifi;
      case 'parking':
        return Car;
      case 'restaurant':
        return Coffee;
      default:
        return Star;
    }
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Limited':
        return 'bg-yellow-100 text-yellow-800';
      case 'Sold Out':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchFilters.location}
                onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
              >
                <option value="">All Locations</option>
                <option value="ranchi">Ranchi</option>
                <option value="netarhat">Netarhat</option>
                <option value="deoghar">Deoghar</option>
                <option value="jamshedpur">Jamshedpur</option>
                <option value="betla">Betla National Park</option>
              </select>
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
                onChange={(e) => setSearchFilters({...searchFilters, checkIn: e.target.value})}
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
                onChange={(e) => setSearchFilters({...searchFilters, checkOut: e.target.value})}
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
                onChange={(e) => setSearchFilters({...searchFilters, guests: parseInt(e.target.value)})}
              >
                {[1,2,3,4,5,6].map(num => (
                  <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-end">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
              <Search className="w-4 h-4 mr-2" />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hotel Categories</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.value}
              className="px-4 py-2 border border-gray-300 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-colors text-sm font-medium"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-blue-600 text-white px-2 py-1 text-xs font-medium rounded">
                  {hotel.discount}% OFF
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="absolute bottom-4 right-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(hotel.availability)}`}>
                  {hotel.availability}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{hotel.name}</h3>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{hotel.rating}</span>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-3">
                <MapPin className="w-4 h-4 mr-1" />
                {hotel.location}
              </div>

              <div className="flex items-center text-xs text-gray-500 mb-4">
                <span>{hotel.reviews} reviews</span>
                <span className="mx-1">•</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{hotel.category}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {hotel.amenities.slice(0, 3).map((amenity) => {
                  const Icon = getAmenityIcon(amenity);
                  return (
                    <div key={amenity} className="flex items-center bg-gray-50 px-2 py-1 rounded text-xs text-gray-600">
                      <Icon className="w-3 h-3 mr-1" />
                      {amenity}
                    </div>
                  );
                })}
                {hotel.amenities.length > 3 && (
                  <span className="text-xs text-gray-500">+{hotel.amenities.length - 3} more</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="text-lg font-semibold text-gray-900">₹{hotel.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">₹{hotel.originalPrice.toLocaleString()}</span>
                  </div>
                  <span className="text-xs text-gray-500">per night</span>
                </div>
                <Link
                  to={`/dashboard/hotels/${hotel.id}/book`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center"
                >
                  Book Now
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg transition-colors font-medium">
          Load More Hotels
        </button>
      </div>
    </div>
  );
};

export default HotelsBooking;
