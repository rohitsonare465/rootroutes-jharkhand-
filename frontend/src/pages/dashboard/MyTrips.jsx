import React from 'react';
import { 
  Plane, 
  MapPin, 
  Calendar, 
  Users,
  Clock,
  Star,
  Edit,
  Trash2,
  Eye,
  Plus,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';

const MyTrips = () => {
  const trips = [
    {
      id: 1,
      title: 'Netarhat Hill Station Adventure',
      status: 'upcoming',
      startDate: '2024-12-15',
      endDate: '2024-12-20',
      destinations: ['Netarhat', 'Betla National Park', 'Hundru Falls'],
      participants: 4,
      budget: 25000,
      spent: 0,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      itinerary: [
        { day: 1, activity: 'Arrival in Netarhat', location: 'Netarhat' },
        { day: 2, activity: 'Sunrise Point & Magnolia Point', location: 'Netarhat' },
        { day: 3, activity: 'Travel to Betla National Park', location: 'Betla' },
        { day: 4, activity: 'Safari & Wildlife Spotting', location: 'Betla' },
        { day: 5, activity: 'Hundru Falls Visit', location: 'Hundru Falls' },
      ],
      bookings: {
        accommodation: 'Confirmed',
        transport: 'Pending',
        activities: 'Confirmed',
      }
    },
    {
      id: 2,
      title: 'Spiritual Journey - Deoghar',
      status: 'ongoing',
      startDate: '2024-10-05',
      endDate: '2024-10-08',
      destinations: ['Baidyanath Temple', 'Tapovan', 'Basukinath'],
      participants: 2,
      budget: 15000,
      spent: 8500,
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop',
      itinerary: [
        { day: 1, activity: 'Arrival & Baidyanath Temple', location: 'Deoghar' },
        { day: 2, activity: 'Tapovan & Meditation', location: 'Tapovan' },
        { day: 3, activity: 'Basukinath Temple Visit', location: 'Basukinath' },
        { day: 4, activity: 'Return Journey', location: 'Deoghar' },
      ],
      bookings: {
        accommodation: 'Confirmed',
        transport: 'Confirmed',
        activities: 'Confirmed',
      }
    },
    {
      id: 3,
      title: 'Ranchi City Explorer',
      status: 'completed',
      startDate: '2024-09-15',
      endDate: '2024-09-17',
      destinations: ['Rock Garden', 'Tagore Hill', 'Kanke Dam'],
      participants: 6,
      budget: 12000,
      spent: 11200,
      image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=300&fit=crop',
      itinerary: [
        { day: 1, activity: 'City Arrival & Rock Garden', location: 'Ranchi' },
        { day: 2, activity: 'Tagore Hill & Local Markets', location: 'Ranchi' },
        { day: 3, activity: 'Kanke Dam & Departure', location: 'Ranchi' },
      ],
      bookings: {
        accommodation: 'Confirmed',
        transport: 'Confirmed',
        activities: 'Confirmed',
      },
      rating: 4.5,
      review: 'Amazing city experience with great local food and friendly people!'
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming':
        return Clock;
      case 'ongoing':
        return AlertCircle;
      case 'completed':
        return CheckCircle;
      case 'cancelled':
        return XCircle;
      default:
        return Clock;
    }
  };

  const getBookingStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'text-green-600';
      case 'Pending':
        return 'text-yellow-600';
      case 'Cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return `${diffDays} days`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
            <p className="mt-2 text-gray-600">Manage and track all your Jharkhand adventures</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              {trips.length} trip{trips.length !== 1 ? 's' : ''} planned
            </div>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Plan New Trip
            </button>
          </div>
        </div>
      </div>

      {/* Trip Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { status: 'upcoming', count: trips.filter(t => t.status === 'upcoming').length, color: 'blue' },
          { status: 'ongoing', count: trips.filter(t => t.status === 'ongoing').length, color: 'green' },
          { status: 'completed', count: trips.filter(t => t.status === 'completed').length, color: 'gray' },
          { status: 'total', count: trips.length, color: 'purple' },
        ].map((stat) => (
          <div key={stat.status} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className={`w-3 h-3 bg-${stat.color}-500 rounded-full mr-3`}></div>
              <div>
                <p className="text-sm font-medium text-gray-600 capitalize">{stat.status} Trips</p>
                <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trips List */}
      <div className="space-y-6">
        {trips.map((trip) => {
          const StatusIcon = getStatusIcon(trip.status);
          return (
            <div key={trip.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Trip Image */}
                <div className="lg:w-64 h-48 lg:h-auto">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Trip Details */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 mr-3">{trip.title}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {calculateDuration(trip.startDate, trip.endDate)}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {trip.participants} participants
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Destinations */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-800 mb-2">Destinations:</h4>
                    <div className="flex flex-wrap gap-2">
                      {trip.destinations.map((destination) => (
                        <span key={destination} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
                          <MapPin className="w-3 h-3 inline mr-1" />
                          {destination}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Budget & Bookings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 mb-2">Budget & Expenses:</h4>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Budget:</span>
                          <span className="font-medium">₹{trip.budget.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Spent:</span>
                          <span className="font-medium">₹{trip.spent.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(trip.spent / trip.budget) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {Math.round((trip.spent / trip.budget) * 100)}% used
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-800 mb-2">Booking Status:</h4>
                      <div className="space-y-1 text-sm">
                        {Object.entries(trip.bookings).map(([type, status]) => (
                          <div key={type} className="flex justify-between">
                            <span className="capitalize">{type}:</span>
                            <span className={`font-medium ${getBookingStatusColor(status)}`}>
                              {status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Rating for completed trips */}
                  {trip.status === 'completed' && trip.rating && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm font-medium">{trip.rating}/5</span>
                        </div>
                        {trip.review && (
                          <p className="text-sm text-gray-600 italic">"{trip.review}"</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {trips.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Plane className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No trips yet</h3>
          <p className="text-gray-600 mb-6">Start planning your first adventure in Jharkhand!</p>
          <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            Plan Your First Trip
          </button>
        </div>
      )}
    </div>
  );
};

export default MyTrips;
