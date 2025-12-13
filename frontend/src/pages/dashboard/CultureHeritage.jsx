import React from 'react';
import {
  BookOpen,
  MapPin,
  Users,
  Calendar,
  Star,
  Play,
  Image,
  Music,
  Palette,
  Camera
} from 'lucide-react';
import { cultureAPI } from '../../services/api';

const CultureHeritage = () => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState({
    sites: [],
    tribes: [],
    festivals: [],
    artForms: []
  });

  React.useEffect(() => {
    fetchCultureData();
  }, []);

  const fetchCultureData = async () => {
    try {
      setLoading(true);
      const response = await cultureAPI.getAll();
      const allItems = response.data.data;

      const sites = allItems.filter(item =>
        ['Religious Heritage', 'Religious Architecture', 'Cultural Museum', 'Historical'].includes(item.category)
      );
      const tribes = allItems.filter(item => item.category === 'Tribe');
      const festivals = allItems.filter(item => item.category === 'Festival');
      const artForms = allItems.filter(item => item.category === 'Art Form');

      setData({ sites, tribes, festivals, artForms });
    } catch (err) {
      console.error('Failed to fetch culture data:', err);
      setError('Failed to load cultural data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenMap = (url, location) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-700">{error}</h2>
        <button
          onClick={fetchCultureData}
          className="mt-4 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Culture & Heritage</h1>
            <p className="text-orange-100 text-lg">Explore the rich cultural tapestry of Jharkhand</p>
          </div>
          <div className="hidden md:block">
            <BookOpen className="w-16 h-16 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Cultural Sites */}
      {data.sites.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Heritage Sites</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.sites.map((site) => (
              <div key={site._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src={site.images && site.images.length > 0 ? site.images[0] : 'https://via.placeholder.com/400x300?text=No+Image'}
                  alt={site.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{site.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{site.rating || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {site.location}
                  </div>
                  <div className="flex items-center text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded mb-3 w-fit">
                    <Calendar className="w-3 h-3 mr-1" />
                    {site.period}
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{site.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{site.visitors}</span>
                    <button
                      onClick={() => handleOpenMap(site.googleMapsUrl, site.location)}
                      className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700 transition-colors flex items-center gap-1"
                    >
                      <MapPin className="w-3 h-3" /> View on Map
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tribal Communities */}
      {data.tribes.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tribal Communities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.tribes.map((tribe) => (
              <div key={tribe._id} className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                <img
                  src={tribe.images && tribe.images.length > 0 ? tribe.images[0] : 'https://via.placeholder.com/300x200?text=No+Image'}
                  alt={tribe.name}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{tribe.name}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    Population: {tribe.details && tribe.details['Population'] ? tribe.details['Population'] : 'Unknown'}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {tribe.location}
                  </div>
                </div>

                {tribe.details && tribe.details['Traditions'] && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Traditions:</h4>
                    <div className="flex flex-wrap gap-1">
                      {tribe.details['Traditions'].split(',').map((tradition, idx) => (
                        <span key={idx} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {tradition.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {tribe.details && tribe.details['Crafts'] && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Traditional Crafts:</h4>
                    <div className="flex flex-wrap gap-1">
                      {tribe.details['Crafts'].split(',').map((craft, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {craft.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Festivals */}
      {data.festivals.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Traditional Festivals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.festivals.map((festival) => (
              <div key={festival._id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <img
                  src={festival.images && festival.images.length > 0 ? festival.images[0] : 'https://via.placeholder.com/300x200?text=No+Image'}
                  alt={festival.name}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{festival.name}</h3>
                <div className="space-y-1 mb-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {festival.details && festival.details['Season'] ? festival.details['Season'] : 'Seasonal'}
                  </div>
                  <div>Duration: {festival.details && festival.details['Duration'] ? festival.details['Duration'] : 'Varies'}</div>
                  <div className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded w-fit">
                    {festival.significance}
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">{festival.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Art Forms */}
      {data.artForms.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Traditional Art Forms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.artForms.map((art) => {
              // Dynamically choose icon based on description or default
              const Icon = Palette;
              return (
                <div key={art._id} className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{art.name}</h3>
                  <div className="text-sm text-purple-600 font-medium mb-1">{art.category}</div>
                  <div className="text-xs text-gray-600 mb-3">{art.details && art.details['Materials'] ? art.details['Materials'] : 'Traditional Materials'}</div>
                  <p className="text-sm text-gray-600">{art.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive Elements */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore More</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 text-center">
            <Camera className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Virtual Tours</h3>
            <p className="text-sm text-gray-600 mb-4">Take virtual tours of heritage sites and museums.</p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Start Tour
            </button>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <BookOpen className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cultural Stories</h3>
            <p className="text-sm text-gray-600 mb-4">Read fascinating stories and legends from Jharkhand.</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Read Stories
            </button>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <Play className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cultural Videos</h3>
            <p className="text-sm text-gray-600 mb-4">Watch documentaries and cultural performances.</p>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
              Watch Videos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CultureHeritage;
