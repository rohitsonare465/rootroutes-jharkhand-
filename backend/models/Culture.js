const mongoose = require('mongoose');

const cultureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide the site name'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    category: {
        type: String,
        enum: ['Religious Heritage', 'Religious Architecture', 'Cultural Museum', 'Tribe', 'Festival', 'Art Form', 'Historical'],
        required: [true, 'Please specify the category']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
        maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    location: {
        type: String,
        required: [true, 'Please provide the location'],
        trim: true
    },
    images: [{
        type: String,
        required: true
    }],
    period: {
        type: String, // e.g., "12th Century", "Contemporary"
        default: 'Unknown'
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    visitors: {
        type: String, // e.g., "2M+ annually"
        default: 'Unknown'
    },
    googleMapsUrl: {
        type: String,
        default: ''
    },
    significance: {
        type: String, // e.g., "Religious", "Architectural"
        default: ''
    },
    details: {
        // Flexible field for extra details like "traditions" for tribes, "materials" for art
        type: Map,
        of: String
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: false // Optional for seeded data
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create index for search
cultureSchema.index({ name: 'text', description: 'text', location: 'text' });
cultureSchema.index({ category: 1 });

module.exports = mongoose.model('Culture', cultureSchema);
