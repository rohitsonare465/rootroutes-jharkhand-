import React from 'react';
import { 
  Compass, 
  MapPin, 
  Camera, 
  Book,
  Clock,
  Star,
  Download,
  Share,
  Navigation,
  Phone,
  Globe
} from 'lucide-react';

const TravelGuide = () => {
  const guides = [
    {
      id: 1,
      title: 'Complete Guide to Netarhat',
      subtitle: 'The Queen of Chotanagpur',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      type: 'Comprehensive Guide',
      duration: '3-5 days',
      difficulty: 'Easy',
      rating: 4.8,
      downloads: 12500,
      description: 'Complete travel guide covering attractions, accommodation, and local experiences in Netarhat.',
      highlights: ['Sunrise Point', 'Sunset Point', 'Magnolia Point', 'Upper Ghaghri Falls'],
    },
    {
      id: 2,
      title: 'Ranchi City Explorer',
      subtitle: 'Urban Adventures in Capital',
      image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=300&fit=crop',
      type: 'City Guide',
      duration: '2-3 days',
      difficulty: 'Easy',
      rating: 4.5,
      downloads: 8900,
      description: 'Navigate through Ranchi with insider tips on attractions, food, and culture.',
      highlights: ['Rock Garden', 'Tagore Hill', 'Kanke Dam', 'Tribal Museum'],
    },
    {
      id: 3,
      title: 'Deoghar Pilgrimage Guide',
      subtitle: 'Sacred Journey to Baidyanath',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop',
      type: 'Pilgrimage Guide',
      duration: '2-4 days',
      difficulty: 'Moderate',
      rating: 4.7,
      downloads: 15600,
      description: 'Spiritual guide covering temples, rituals, and accommodation in Deoghar.',
      highlights: ['Baidyanath Temple', 'Tapovan', 'Basukinath', 'Trikut Parvat'],
    },
    {
      id: 4,
      title: 'Betla National Park Safari',
      subtitle: 'Wildlife Adventure Guide',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop',
      type: 'Wildlife Guide',
      duration: '2-3 days',
      difficulty: 'Moderate',
      rating: 4.6,
      downloads: 7800,
      description: 'Complete safari guide with wildlife spotting tips and accommodation.',
      highlights: ['Tiger Safari', 'Elephant Safari', 'Palamau Fort', 'Nature Trails'],
    },
  ];

  const quickTips = [
    {
      icon: Navigation,
      title: 'Getting Around',
      tip: 'Use local buses and auto-rickshaws for budget travel. Book taxis through official apps.',
    },
    {
      icon: Phone,
      title: 'Emergency Contacts',
      tip: 'Keep local police (100) and tourist helpline numbers handy. Download offline maps.',
    },
    {
      icon: Globe,
      title: 'Language Tips',
      tip: 'Hindi is widely spoken. Learn basic phrases in local languages for better interaction.',
    },
    {
      icon: Clock,
      title: 'Best Time to Visit',
      tip: 'October to March offers pleasant weather. Avoid monsoon season for hill stations.',
    },
  ];

  const essentialInfo = [
    {
      category: 'Weather & Climate',
      items: [
        'Summer: 25°C to 42°C (March-June)',
        'Monsoon: Heavy rainfall (July-September)',
        'Winter: 5°C to 25°C (October-February)',
        'Best time: October to March',
      ],
    },
    {
      category: 'Transportation',
      items: [
        'Nearest Airport: Birsa Munda Airport, Ranchi',
        'Major Railway Stations: Ranchi, Dhanbad, Bokaro',
        'Bus Services: State transport and private buses',
        'Local Transport: Auto-rickshaw, taxi, bus',
      ],
    },
    {
      category: 'Cultural Etiquette',
      items: [
        'Dress modestly when visiting temples',
        'Remove shoes before entering religious places',
        'Respect tribal customs and traditions',
        'Ask permission before photographing locals',
      ],
    },
    {
      category: 'Safety Tips',
      items: [
        'Carry valid ID at all times',
        'Inform someone about your travel plans',
        'Avoid isolated areas after dark',
        'Keep emergency contacts handy',
      ],
    },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Difficult':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Travel Guides</h1>
            <p className="text-green-100 text-lg">Your comprehensive guide to exploring Jharkhand</p>
          </div>
          <div className="hidden md:block">
            <Compass className="w-16 h-16 text-green-200" />
          </div>
        </div>
      </div>

      {/* Guide Categories */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Travel Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((guide) => (
            <div key={guide.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <img
                src={guide.image}
                alt={guide.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{guide.title}</h3>
                    <p className="text-sm text-gray-600">{guide.subtitle}</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{guide.rating}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {guide.duration}
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(guide.difficulty)}`}>
                    {guide.difficulty}
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    {guide.type}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4">{guide.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Key Highlights:</h4>
                  <div className="flex flex-wrap gap-1">
                    {guide.highlights.map((highlight) => (
                      <span key={highlight} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Download className="w-4 h-4 mr-1" />
                    {guide.downloads.toLocaleString()} downloads
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Share className="w-4 h-4" />
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Travel Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickTips.map((tip) => {
            const Icon = tip.icon;
            return (
              <div key={tip.title} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">{tip.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{tip.tip}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Essential Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Essential Travel Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {essentialInfo.map((info) => (
            <div key={info.category} className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{info.category}</h3>
              <ul className="space-y-2">
                {info.items.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Features */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
            <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Maps</h3>
            <p className="text-sm text-gray-600 mb-4">Explore detailed maps with attractions and routes.</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Open Maps
            </button>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
            <Camera className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Photo Gallery</h3>
            <p className="text-sm text-gray-600 mb-4">Browse beautiful images from each destination.</p>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
              View Gallery
            </button>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 text-center">
            <Book className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Local Stories</h3>
            <p className="text-sm text-gray-600 mb-4">Read interesting stories and local legends.</p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Read Stories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelGuide;
