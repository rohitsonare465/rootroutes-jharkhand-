import React from 'react';
import { Link } from 'react-router-dom';
import {
    Star,
    MapPin,
    Wifi,
    Car,
    Coffee,
    Heart,
    ArrowRight
} from 'lucide-react';

const HotelCard = ({ hotel }) => {
    const getAmenityIcon = (amenity) => {
        if (!amenity) return Star;
        const lower = amenity.toLowerCase();
        if (lower.includes('wifi')) return Wifi;
        if (lower.includes('parking') || lower.includes('car')) return Car;
        if (lower.includes('restaurant') || lower.includes('coffee') || lower.includes('breakfast')) return Coffee;
        return Star;
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

    // Safe checks for potentially missing data from API
    const amenities = hotel.amenities || [];
    const image = hotel.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop';
    const rating = hotel.rating || 'N/A';
    const reviews = hotel.reviews || 0;

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
                <img
                    src={image}
                    alt={hotel.name}
                    className="w-full h-48 object-cover"
                />
                {hotel.discount && (
                    <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-2 py-1 text-xs font-medium rounded">
                            {hotel.discount}% OFF
                        </span>
                    </div>
                )}
                <div className="absolute top-4 right-4">
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                        <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
                {hotel.availability && (
                    <div className="absolute bottom-4 right-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(hotel.availability)}`}>
                            {hotel.availability}
                        </span>
                    </div>
                )}
            </div>

            <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{hotel.name}</h3>
                    <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{rating}</span>
                    </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hotel.location}
                </div>

                <div className="flex items-center text-xs text-gray-500 mb-4">
                    <span>{reviews} reviews</span>
                    {hotel.category && (
                        <>
                            <span className="mx-1">•</span>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{hotel.category}</span>
                        </>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {amenities.slice(0, 3).map((amenity, index) => {
                        const Icon = getAmenityIcon(amenity);
                        return (
                            <div key={index} className="flex items-center bg-gray-50 px-2 py-1 rounded text-xs text-gray-600">
                                <Icon className="w-3 h-3 mr-1" />
                                {amenity}
                            </div>
                        );
                    })}
                    {amenities.length > 3 && (
                        <span className="text-xs text-gray-500">+{amenities.length - 3} more</span>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center">
                            <span className="text-lg font-semibold text-gray-900">{hotel.price?.toLocaleString()}</span>
                            {hotel.originalPrice && (
                                <span className="text-sm text-gray-500 line-through ml-2">{hotel.originalPrice?.toLocaleString()}</span>
                            )}
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
    );
};

export default HotelCard;
