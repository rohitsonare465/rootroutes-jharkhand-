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

const CultureHeritage = () => {
  const culturalSites = [
    {
      id: 1,
      name: 'Baidyanath Temple Complex',
      location: 'Deoghar',
      category: 'Religious Heritage',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop',
      description: 'One of the twelve Jyotirlingas, this sacred temple is a major pilgrimage site.',
      significance: 'Religious',
      period: '12th Century',
      rating: 4.8,
      visitors: '2M+ annually',
    },
    {
      id: 2,
      name: 'Jagannath Temple',
      location: 'Ranchi',
      category: 'Religious Architecture',
      image: 'https://images.unsplash.com/photo-1580800917294-d884c7780b2a?w=400&h=300&fit=crop',
      description: 'A beautiful replica of the famous Puri Jagannath Temple.',
      significance: 'Architectural',
      period: '20th Century',
      rating: 4.5,
      visitors: '500K+ annually',
    },
    {
      id: 3,
      name: 'Tribal Culture Museum',
      location: 'Ranchi',
      category: 'Cultural Museum',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      description: 'Showcases the rich tribal heritage and artifacts of Jharkhand.',
      significance: 'Cultural',
      period: 'Contemporary',
      rating: 4.3,
      visitors: '100K+ annually',
    },
  ];

  const tribalCultures = [
    {
      name: 'Santhal',
      population: '2.8M',
      region: 'Eastern Jharkhand',
      traditions: ['Sohrai Festival', 'Traditional Dance', 'Folk Music'],
      crafts: ['Wall Paintings', 'Terracotta', 'Wood Carving'],
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop',
    },
    {
      name: 'Munda',
      population: '1.2M',
      region: 'Central Jharkhand',
      traditions: ['Karam Festival', 'Hunting Songs', 'Martial Arts'],
      crafts: ['Iron Works', 'Basket Weaving', 'Stone Carving'],
      image: 'https://images.unsplash.com/photo-1544967888-b9eb7073aa77?w=300&h=200&fit=crop',
    },
    {
      name: 'Oraon',
      population: '900K',
      region: 'Western Jharkhand',
      traditions: ['Jatra Festival', 'Folk Drama', 'Agricultural Songs'],
      crafts: ['Bamboo Work', 'Cloth Weaving', 'Pottery'],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
    },
  ];

  const festivals = [
    {
      name: 'Sohrai Festival',
      season: 'October-November',
      duration: '7 days',
      description: 'Harvest festival celebrated with colorful wall paintings and cattle worship.',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop',
      significance: 'Harvest Celebration',
    },
    {
      name: 'Karam Festival',
      season: 'September',
      duration: '3 days',
      description: 'Worship of nature and the Karam tree with traditional dances.',
      image: 'https://images.unsplash.com/photo-1544967888-b9eb7073aa77?w=300&h=200&fit=crop',
      significance: 'Nature Worship',
    },
    {
      name: 'Tusu Festival',
      season: 'December-January',
      duration: '15 days',
      description: 'Folk festival with traditional songs, dances, and community celebrations.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
      significance: 'Folk Celebration',
    },
  ];

  const artForms = [
    {
      name: 'Sohrai Painting',
      type: 'Wall Art',
      materials: 'Natural Pigments',
      icon: Palette,
      description: 'Traditional wall paintings created during harvest festivals.',
    },
    {
      name: 'Paitkar Painting',
      type: 'Scroll Art',
      materials: 'Paper, Natural Colors',
      icon: Image,
      description: 'Narrative scroll paintings depicting mythological stories.',
    },
    {
      name: 'Tribal Dance',
      type: 'Performance Art',
      materials: 'Traditional Costumes',
      icon: Music,
      description: 'Ritualistic dances performed during festivals and ceremonies.',
    },
    {
      name: 'Folk Music',
      type: 'Musical Art',
      materials: 'Traditional Instruments',
      icon: Play,
      description: 'Ancient songs and melodies passed down through generations.',
    },
  ];

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
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Heritage Sites</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {culturalSites.map((site) => (
            <div key={site.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <img
                src={site.image}
                alt={site.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{site.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{site.rating}</span>
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
                <p className="text-sm text-gray-600 mb-4">{site.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{site.visitors}</span>
                  <button className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tribal Cultures */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tribal Communities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tribalCultures.map((tribe) => (
            <div key={tribe.name} className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
              <img
                src={tribe.image}
                alt={tribe.name}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{tribe.name} Tribe</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  Population: {tribe.population}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {tribe.region}
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Traditions:</h4>
                <div className="flex flex-wrap gap-1">
                  {tribe.traditions.map((tradition) => (
                    <span key={tradition} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {tradition}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Traditional Crafts:</h4>
                <div className="flex flex-wrap gap-1">
                  {tribe.crafts.map((craft) => (
                    <span key={craft} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {craft}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Festivals */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Traditional Festivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {festivals.map((festival) => (
            <div key={festival.name} className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <img
                src={festival.image}
                alt={festival.name}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{festival.name}</h3>
              <div className="space-y-1 mb-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {festival.season}
                </div>
                <div>Duration: {festival.duration}</div>
                <div className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded w-fit">
                  {festival.significance}
                </div>
              </div>
              <p className="text-sm text-gray-600">{festival.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Art Forms */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Traditional Art Forms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {artForms.map((art) => {
            const Icon = art.icon;
            return (
              <div key={art.name} className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{art.name}</h3>
                <div className="text-sm text-purple-600 font-medium mb-1">{art.type}</div>
                <div className="text-xs text-gray-600 mb-3">{art.materials}</div>
                <p className="text-sm text-gray-600">{art.description}</p>
              </div>
            );
          })}
        </div>
      </div>

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
