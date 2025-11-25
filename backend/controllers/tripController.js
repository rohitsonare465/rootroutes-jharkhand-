const Trip = require('../models/Trip');
const Destination = require('../models/Destination');

// @desc    Get all trips for logged in user
// @route   GET /api/trips
// @access  Private
exports.getTrips = async (req, res, next) => {
    try {
        const trips = await Trip.find({ user: req.user.id })
            .populate('destinations', 'title location images')
            .sort({ startDate: 1 });

        res.status(200).json({
            success: true,
            count: trips.length,
            data: trips
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get single trip
// @route   GET /api/trips/:id
// @access  Private
exports.getTrip = async (req, res, next) => {
    try {
        const trip = await Trip.findById(req.params.id).populate('destinations');

        if (!trip) {
            return res.status(404).json({ success: false, error: 'Trip not found' });
        }

        // Make sure user owns trip
        if (trip.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: 'Not authorized to access this trip' });
        }

        res.status(200).json({
            success: true,
            data: trip
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Create new trip
// @route   POST /api/trips
// @access  Private
exports.createTrip = async (req, res, next) => {
    try {
        // Add user to req.body
        req.body.user = req.user.id;

        const trip = await Trip.create(req.body);

        res.status(201).json({
            success: true,
            data: trip
        });
    } catch (err) {
        console.error(err);
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ success: false, error: messages });
        }
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update trip
// @route   PUT /api/trips/:id
// @access  Private
exports.updateTrip = async (req, res, next) => {
    try {
        let trip = await Trip.findById(req.params.id);

        if (!trip) {
            return res.status(404).json({ success: false, error: 'Trip not found' });
        }

        // Make sure user owns trip
        if (trip.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: 'Not authorized to update this trip' });
        }

        trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: trip
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Delete trip
// @route   DELETE /api/trips/:id
// @access  Private
exports.deleteTrip = async (req, res, next) => {
    try {
        const trip = await Trip.findById(req.params.id);

        if (!trip) {
            return res.status(404).json({ success: false, error: 'Trip not found' });
        }

        // Make sure user owns trip
        if (trip.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: 'Not authorized to delete this trip' });
        }

        await trip.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
