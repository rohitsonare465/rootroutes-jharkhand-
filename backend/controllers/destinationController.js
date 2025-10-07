const Destination = require('../models/Destination');

// @desc    Get all destinations
// @route   GET /api/destinations
// @access  Public
const getDestinations = async (req, res) => {
  try {
    const { search, tags, difficulty, page = 1, limit = 10 } = req.query;

    // Build query
    let query = { status: 'active' };

    // Search by title, description, or location
    if (search) {
      query.$text = { $search: search };
    }

    // Filter by tags
    if (tags) {
      const tagArray = tags.split(',');
      query.tags = { $in: tagArray };
    }

    // Filter by difficulty
    if (difficulty) {
      query.difficulty = difficulty;
    }

    // Execute query with pagination
    const destinations = await Destination.find(query)
      .populate('createdBy', 'name')
      .sort({ 'rating.average': -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Get total count for pagination
    const total = await Destination.countDocuments(query);

    res.json({
      status: 'success',
      data: {
        destinations,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
          limit: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get destinations error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error fetching destinations'
    });
  }
};

// @desc    Get single destination
// @route   GET /api/destinations/:id
// @access  Public
const getDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!destination) {
      return res.status(404).json({
        status: 'error',
        message: 'Destination not found'
      });
    }

    res.json({
      status: 'success',
      data: destination
    });
  } catch (error) {
    console.error('Get destination error:', error);
    
    if (error.name === 'CastError') {
      return res.status(404).json({
        status: 'error',
        message: 'Destination not found'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Server error fetching destination'
    });
  }
};

// @desc    Create new destination
// @route   POST /api/destinations
// @access  Private
const createDestination = async (req, res) => {
  try {
    const destination = await Destination.create({
      ...req.body,
      createdBy: req.user.id
    });

    const populatedDestination = await Destination.findById(destination._id)
      .populate('createdBy', 'name');

    res.status(201).json({
      status: 'success',
      data: populatedDestination
    });
  } catch (error) {
    console.error('Create destination error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        status: 'error',
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Server error creating destination'
    });
  }
};

// @desc    Update destination
// @route   PUT /api/destinations/:id
// @access  Private
const updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        status: 'error',
        message: 'Destination not found'
      });
    }

    // Check if user owns this destination or is admin
    if (destination.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this destination'
      });
    }

    const updatedDestination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name');

    res.json({
      status: 'success',
      data: updatedDestination
    });
  } catch (error) {
    console.error('Update destination error:', error);
    
    if (error.name === 'CastError') {
      return res.status(404).json({
        status: 'error',
        message: 'Destination not found'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Server error updating destination'
    });
  }
};

// @desc    Delete destination
// @route   DELETE /api/destinations/:id
// @access  Private
const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        status: 'error',
        message: 'Destination not found'
      });
    }

    // Check if user owns this destination or is admin
    if (destination.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to delete this destination'
      });
    }

    await Destination.findByIdAndDelete(req.params.id);

    res.json({
      status: 'success',
      message: 'Destination deleted successfully'
    });
  } catch (error) {
    console.error('Delete destination error:', error);
    
    if (error.name === 'CastError') {
      return res.status(404).json({
        status: 'error',
        message: 'Destination not found'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Server error deleting destination'
    });
  }
};

module.exports = {
  getDestinations,
  getDestination,
  createDestination,
  updateDestination,
  deleteDestination
};