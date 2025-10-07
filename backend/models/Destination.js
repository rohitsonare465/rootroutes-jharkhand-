const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a destination title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
    trim: true
  },
  coordinates: {
    latitude: {
      type: Number,
      default: null
    },
    longitude: {
      type: Number,
      default: null
    }
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    }
  }],
  tags: [{
    type: String,
    enum: [
      'waterfall', 'temple', 'trek', 'wildlife', 'cultural', 'historical',
      'adventure', 'nature', 'photography', 'family-friendly', 'offbeat',
      'religious', 'tribal', 'forest', 'hill-station', 'river', 'cave'
    ]
  }],
  difficulty: {
    type: String,
    enum: ['easy', 'moderate', 'difficult'],
    default: 'easy'
  },
  bestTime: {
    type: String,
    default: 'October to March'
  },
  duration: {
    type: String,
    default: '1 day'
  },
  entryFee: {
    type: String,
    default: 'Free'
  },
  facilities: [{
    type: String,
    enum: [
      'parking', 'restroom', 'food', 'guide', 'accommodation',
      'first-aid', 'water', 'electricity', 'transport'
    ]
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Create indexes for better search performance
destinationSchema.index({ title: 'text', description: 'text', location: 'text' });
destinationSchema.index({ tags: 1 });
destinationSchema.index({ location: 1 });
destinationSchema.index({ 'rating.average': -1 });

module.exports = mongoose.model('Destination', destinationSchema);