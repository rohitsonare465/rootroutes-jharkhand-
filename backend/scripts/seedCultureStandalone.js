const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Culture = require('../models/Culture');
const connectDB = require('../config/database');

// Load env vars
dotenv.config({ path: __dirname + '/../.env' });

const seedData = async () => {
    try {
        // Connect directly
        await mongoose.connect('mongodb://localhost:27017/rootroutes_jharkhand');
        console.log('MongoDB Connected for Seeding');

        await Culture.deleteMany();
        console.log('Cleared existing culture data');

        const initialData = [
            {
                name: 'Baidyanath Temple Complex',
                location: 'Deoghar, Jharkhand',
                category: 'Religious Heritage',
                images: ['https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop'],
                description: 'One of the twelve Jyotirlingas, this sacred temple is a major pilgrimage site. It is famous for the Shravani Mela.',
                significance: 'Religious',
                period: '12th Century',
                rating: 4.8,
                visitors: '2M+ annually',
                googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Baidyanath+Temple+Complex+Deoghar'
            },
            {
                name: 'Jagannath Temple',
                location: 'Ranchi, Jharkhand',
                category: 'Religious Architecture',
                images: ['https://images.unsplash.com/photo-1580800917294-d884c7780b2a?w=400&h=300&fit=crop'],
                description: 'A beautiful replica of the famous Puri Jagannath Temple, built in 1691 by King Ani Nath Shahdeo.',
                significance: 'Architectural',
                period: '20th Century (Restored)',
                rating: 4.5,
                visitors: '500K+ annually',
                googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jagannath+Temple+Ranchi'
            },
            {
                name: 'Tribal Culture Museum',
                location: 'Ranchi, Jharkhand',
                category: 'Cultural Museum',
                images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'],
                description: 'Showcases the rich tribal heritage, lifestyle, and artifacts of Jharkhand.',
                significance: 'Cultural',
                period: 'Contemporary',
                rating: 4.3,
                visitors: '100K+ annually',
                googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tribal+Museum+Ranchi'
            },
            // Tribes
            {
                name: 'Santhal Tribe',
                location: 'Eastern Jharkhand',
                category: 'Tribe',
                images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop'],
                description: 'The largest tribal community in Jharkhand, known for their music, dance, and art.',
                significance: 'Demographic',
                details: {
                    'Traditions': 'Sohrai Festival, Traditional Dance',
                    'Crafts': 'Wall Paintings, Terracotta',
                    'Population': '2.8M'
                }
            },
            {
                name: 'Munda Tribe',
                location: 'Central Jharkhand',
                category: 'Tribe',
                images: ['https://images.unsplash.com/photo-1544967888-b9eb7073aa77?w=300&h=200&fit=crop'],
                description: 'One of the oldest tribes, known for their unique martial arts and agricultural festivals.',
                significance: 'Historical',
                details: {
                    'Traditions': 'Karam Festival, Hunting Songs, Martial Arts',
                    'Crafts': 'Iron Works, Basket Weaving, Stone Carving',
                    'Population': '1.2M'
                }
            },
            {
                name: 'Oraon Tribe',
                location: 'Western Jharkhand',
                category: 'Tribe',
                images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop'],
                description: 'Known for their rich folklore and the famous Jatra festival.',
                significance: 'Cultural',
                details: {
                    'Traditions': 'Jatra Festival, Folk Drama, Agricultural Songs',
                    'Crafts': 'Bamboo Work, Cloth Weaving, Pottery',
                    'Population': '900K'
                }
            },
            // Festivals
            {
                name: 'Sohrai Festival',
                location: 'All Jharkhand',
                category: 'Festival',
                images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop'],
                description: 'Harvest festival celebrated with colorful wall paintings and cattle worship.',
                significance: 'Harvest Celebration',
                period: 'Annual',
                details: {
                    'Season': 'October-November',
                    'Duration': '7 days'
                }
            },
            {
                name: 'Karam Festival',
                location: 'Jharkhand',
                category: 'Festival',
                images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_g6kQ_q_q_q_q_q_q_q_q_q_q'], // Placeholder logic
                description: 'Worship of nature and the Karam tree with traditional dances.',
                significance: 'Nature Worship',
                details: {
                    'Season': 'September',
                    'Duration': '3 days'
                }
            },
            {
                name: 'Chhau Dance',
                location: 'Seraikela, Jharkhand',
                category: 'Art Form',
                images: ['https://upload.wikimedia.org/wikipedia/commons/e/e6/Chhau_Dance.jpg'],
                description: 'A semi-classical Indian dance with martial, tribal, and folk origins. In 2010 the Chhau dance was inscribed in the UNESCOs Representative List of the Intangible Cultural Heritage of Humanity.',
                significance: 'Cultural Heritage',
                period: 'Ancient',
                details: {
                    'Materials': 'Masks, Costumes',
                    'Type': 'Performance Art'
                },
                googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Seraikela+Jharkhand'
            },
            {
                name: 'Sohrai Painting',
                location: 'Hazaribagh',
                category: 'Art Form',
                images: ['https://engtis.bwxt.com/assets/images/no-image-available.png'], // Placeholder
                description: 'Traditional wall paintings created during harvest festivals.',
                significance: 'Artistic',
                details: {
                    'Materials': 'Natural Pigments',
                    'Type': 'Wall Art'
                }
            }
        ];

        await Culture.insertMany(initialData);

        console.log('Data seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Seed failed:', error);
        process.exit(1);
    }
};

seedData();
