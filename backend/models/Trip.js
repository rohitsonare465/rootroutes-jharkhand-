const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please add a trip title'],
        trim: true,
        maxlength: [50, 'Title cannot be more than 50 characters']
    },
    startDate: {
        type: Date,
        required: [true, 'Please add a start date']
    },
    endDate: {
        type: Date,
        required: [true, 'Please add an end date']
    },
    budget: {
        type: Number,
        required: [true, 'Please add a budget']
    },
    travelers: {
        type: Number,
        required: [true, 'Please add number of travelers'],
        min: [1, 'At least one traveler is required']
    },
    destinations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination'
    }],
    status: {
        type: String,
        enum: ['planning', 'active', 'completed', 'cancelled'],
        default: 'planning'
    },
    notes: {
        type: String,
        maxlength: [500, 'Notes cannot be more than 500 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Trip', tripSchema);
