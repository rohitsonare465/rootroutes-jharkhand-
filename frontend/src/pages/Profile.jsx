import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { destinationsAPI } from '../services/api';

const Profile = () => {
  const { user, logout } = useAuth();
  const [userDestinations, setUserDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDestinations = async () => {
      try {
        setLoading(true);
        // This would need to be implemented in the backend to filter by user
        // For now, we'll just show all destinations
        const response = await destinationsAPI.getAll({ limit: 50 });
        // Filter destinations created by current user
        const userDests = response.data.data.destinations.filter(
          dest => dest.createdBy?._id === user._id || dest.createdBy?.name === user.name
        );
        setUserDestinations(userDests);
      } catch (error) {
        console.error('Error fetching user destinations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserDestinations();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDefaultImage = () => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop';

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                Member since {new Date(user.createdAt || Date.now()).toLocaleDateString()}
              </p>
              <div className="mt-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'admin'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-green-100 text-green-800'
                  }`}>
                  {user.role === 'admin' ? 'Admin' : 'Explorer'}
                </span>
              </div>
            </div>
            <div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-green-600">{userDestinations.length}</div>
            <div className="text-gray-600">Destinations Shared</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">0</div>
            <div className="text-gray-600">Reviews Written</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-gray-600">Places Visited</div>
          </div>
        </div>

        {/* My Destinations */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">My Destinations</h2>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
              Add New Destination
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="text-gray-600">Loading your destinations...</div>
            </div>
          ) : userDestinations.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-600 mb-4">
                You haven't shared any destinations yet.
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors">
                Share Your First Destination
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userDestinations.map(destination => (
                <div
                  key={destination._id}
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={destination.images?.[0]?.url || getDefaultImage()}
                    alt={destination.title}
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      e.target.src = getDefaultImage();
                    }}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {destination.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      📍 {destination.location}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-yellow-500 text-sm">★</span>
                        <span className="text-sm text-gray-600 ml-1">
                          {destination.rating?.average?.toFixed(1) || 'New'}
                        </span>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${destination.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : destination.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                        {destination.status}
                      </span>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <button className="text-sm text-green-600 hover:text-green-800">
                        Edit
                      </button>
                      <button className="text-sm text-red-600 hover:text-red-800">
                        Delete
                      </button>
                      <button
                        onClick={() => navigate(`/destinations/${destination._id}`)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <button className="text-green-600 hover:text-green-800 font-medium">
                Update Profile Information
              </button>
            </div>
            <div>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Change Password
              </button>
            </div>
            <div>
              <button className="text-gray-600 hover:text-gray-800 font-medium">
                Email Preferences
              </button>
            </div>
            <div className="pt-4 border-t">
              <button className="text-red-600 hover:text-red-800 font-medium">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;