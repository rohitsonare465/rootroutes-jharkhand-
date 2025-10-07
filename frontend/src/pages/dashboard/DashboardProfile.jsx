import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Camera,
  Edit,
  Save,
  X,
  Settings,
  Shield,
  Bell,
  Globe
} from 'lucide-react';

const DashboardProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    location: 'Ranchi, Jharkhand',
    bio: 'Travel enthusiast exploring the beautiful landscapes of Jharkhand. Love adventure and cultural experiences.',
    joinDate: '2024-01-15',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  });

  const [tempData, setTempData] = useState(profileData);

  const stats = [
    { label: 'Trips Completed', value: '12', color: 'bg-blue-500' },
    { label: 'Places Visited', value: '28', color: 'bg-green-500' },
    { label: 'Photos Shared', value: '156', color: 'bg-purple-500' },
    { label: 'Reviews Written', value: '24', color: 'bg-orange-500' },
  ];

  const recentActivity = [
    { action: 'Completed trip to Netarhat', date: '2 days ago', type: 'trip' },
    { action: 'Added Hundru Falls to favorites', date: '5 days ago', type: 'favorite' },
    { action: 'Reviewed Ranchi Hill Resort', date: '1 week ago', type: 'review' },
    { action: 'Uploaded photos from Deoghar', date: '2 weeks ago', type: 'photo' },
  ];

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'preferences', name: 'Preferences', icon: Settings },
    { id: 'privacy', name: 'Privacy', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(profileData);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempData({ ...tempData, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="mt-2 text-gray-600">Manage your account information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{profileData.name}</h2>
              <p className="text-gray-600">{profileData.email}</p>
              <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                Member since {new Date(profileData.joinDate).toLocaleDateString()}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className={`w-8 h-8 ${stat.color} rounded-lg mx-auto mb-2 flex items-center justify-center`}>
                    <span className="text-white font-bold text-sm">{stat.value}</span>
                  </div>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 px-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                    {!isEditing ? (
                      <button
                        onClick={handleEdit}
                        className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSave}
                          className="flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Save className="w-4 h-4 mr-1" />
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <User className="w-4 h-4 text-gray-400 mr-2" />
                          {profileData.name}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={tempData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Mail className="w-4 h-4 text-gray-400 mr-2" />
                          {profileData.email}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={tempData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Phone className="w-4 h-4 text-gray-400 mr-2" />
                          {profileData.phone}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                          {profileData.location}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    {isEditing ? (
                      <textarea
                        value={tempData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        {profileData.bio}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Travel Preferences</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Travel Style
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>Adventure & Outdoor</option>
                        <option>Cultural & Heritage</option>
                        <option>Relaxation & Wellness</option>
                        <option>Photography & Nature</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget Range
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>Budget (₹1,000 - ₹5,000)</option>
                        <option>Mid-range (₹5,000 - ₹15,000)</option>
                        <option>Luxury (₹15,000+)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language Preference
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Bengali</option>
                        <option>Local Languages</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Privacy Settings</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Profile Visibility</h4>
                        <p className="text-sm text-gray-600">Control who can see your profile information</p>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Public
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Trip History</h4>
                        <p className="text-sm text-gray-600">Show your completed trips to other users</p>
                      </div>
                      <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                        Private
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Contact Information</h4>
                        <p className="text-sm text-gray-600">Allow others to contact you directly</p>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Enabled
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
                  <div className="space-y-6">
                    {[
                      { name: 'Trip Reminders', desc: 'Get notified about upcoming trips', enabled: true },
                      { name: 'New Destinations', desc: 'Alerts for new destinations added', enabled: true },
                      { name: 'Special Offers', desc: 'Promotions and discounts on hotels', enabled: false },
                      { name: 'Weather Updates', desc: 'Weather alerts for your destinations', enabled: true },
                      { name: 'Community Updates', desc: 'New reviews and recommendations', enabled: false },
                    ].map((notif) => (
                      <div key={notif.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{notif.name}</h4>
                          <p className="text-sm text-gray-600">{notif.desc}</p>
                        </div>
                        <button
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            notif.enabled 
                              ? 'bg-green-600 text-white hover:bg-green-700' 
                              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                          }`}
                        >
                          {notif.enabled ? 'Enabled' : 'Disabled'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
