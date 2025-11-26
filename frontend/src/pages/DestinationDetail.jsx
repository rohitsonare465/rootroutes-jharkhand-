import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { destinationsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        setLoading(true);
        const response = await destinationsAPI.getById(id);
        setDestination(response.data.data);
      } catch (error) {
        console.error('Error fetching destination:', error);
        setError('Destination not found or error loading details');
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  const getDefaultImage = () => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading destination details...</div>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-lg text-red-600 mb-4">{error}</div>
        <Link
          to="/"
          className="text-green-600 hover:text-green-800 font-medium"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-green-600">Home</Link>
            <span>→</span>
            <span className="text-gray-900">{destination.title}</span>
          </div>
        </nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Main Info */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="mb-6">
              <img
                src={destination.images?.[0]?.url || getDefaultImage()}
                alt={destination.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src = getDefaultImage();
                }}
              />
            </div>

            {/* Title and Basic Info */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {destination.title}
              </h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <span className="text-gray-500 mr-1">📍</span>
                  <span className="text-gray-700">{destination.location}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="text-gray-700">
                    {destination.rating?.average?.toFixed(1) || 'New'}
                    {destination.rating?.count > 0 && ` (${destination.rating.count} reviews)`}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-1">🏃</span>
                  <span className="text-gray-700 capitalize">{destination.difficulty}</span>
                </div>
              </div>

              {/* Tags */}
              {destination.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                    >
                      {tag.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">About</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {destination.description}
              </p>
            </div>

            {/* History */}
            {destination.history && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">History</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {destination.history}
                </p>
              </div>
            )}

            {/* Famous For */}
            {destination.famousFor && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Famous For</h2>
                <p className="text-gray-700 leading-relaxed">
                  {destination.famousFor}
                </p>
              </div>
            )}

            {/* Additional Images */}
            {destination.images?.length > 1 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {destination.images.slice(1).map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={image.alt || `${destination.title} ${index + 2}`}
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = getDefaultImage();
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Quick Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>

              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Best Time:</span>
                  <span className="ml-2 text-gray-600">{destination.bestTime}</span>
                </div>

                <div>
                  <span className="font-medium text-gray-700">Duration:</span>
                  <span className="ml-2 text-gray-600">{destination.duration}</span>
                </div>

                <div>
                  <span className="font-medium text-gray-700">Entry Fee:</span>
                  <span className="ml-2 text-gray-600">{destination.entryFee}</span>
                </div>

                {destination.facilities?.length > 0 && (
                  <div>
                    <span className="font-medium text-gray-700 block mb-2">Facilities:</span>
                    <div className="flex flex-wrap gap-1">
                      {destination.facilities.map(facility => (
                        <span
                          key={facility}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {destination.coordinates?.latitude && destination.coordinates?.longitude && (
                  <div>
                    <span className="font-medium text-gray-700 block mb-2">Location:</span>
                    <a
                      href={`https://maps.google.com/?q=${destination.coordinates.latitude},${destination.coordinates.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 text-sm"
                    >
                      View on Google Maps →
                    </a>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                {!isAuthenticated && (
                  <Link
                    to="/login"
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center block"
                  >
                    Login to Add Review
                  </Link>
                )}

                <button
                  onClick={() => window.history.back()}
                  className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  ← Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default DestinationDetail;