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
                images: ['https://picsum.photos/seed/baidyanath-temple/400/300'],
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
                images: ['https://picsum.photos/seed/jagannath-temple/400/300'],
                description: 'A beautiful replica of the famous Puri Jagannath Temple, built in 1691 by King Ani Nath Shahdeo.',
                significance: 'Architectural',
                period: '1691 AD',
                rating: 4.6,
                visitors: '500K+ annually',
                googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jagannath+Temple+Ranchi'
            },
            {
                name: 'Maluti Temples',
                location: 'Dumka, Jharkhand',
                category: 'Religious Heritage',
                images: ['https://picsum.photos/seed/maluti-temples/400/300'],
                description: 'A group of 72 extant terracotta temples (out of original 108) known as the "Village of Temples".',
                significance: 'Architectural',
                period: '17th-19th Century',
                rating: 4.5,
                visitors: '50K+ annually',
                googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Maluti+Temples+Dumka'
            },
            {
                name: 'Sun Temple',
                location: 'Ranchi, Jharkhand',
                category: 'Religious Architecture',
                images: ['https://picsum.photos/seed/sun-temple-ranchi/400/300'],
                description: 'A uniquely designed temple shaped like a chariot with 18 wheels and 7 horses.',
                significance: 'Architectural',
                period: 'Contemporary',
                rating: 4.4,
                visitors: '200K+ annually',
                googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sun+Temple+Ranchi'
            },
            {
                name: 'Rajrappa Temple',
                location: 'Ramgarh, Jharkhand',
                category: 'Religious Heritage',
                images: ['https://picsum.photos/seed/rajrappa-temple/400/300'],
                description: 'Famous Shakti Peeth located at the confluence of Damodar and Bhairavi rivers. Dedicated to Goddess Chinnamasta.',
                significance: 'Religious',
                period: 'Ancient',
                rating: 4.7,
                visitors: '1M+ annually',
                googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rajrappa+Temple+Ramgarh'
            },
            {
                name: 'Tribal Culture Museum',
                location: 'Ranchi, Jharkhand',
                category: 'Cultural Museum',
                images: ['https://picsum.photos/seed/tribal-museum/400/300'],
                description: 'Showcases the rich tribal heritage, lifestyle, and artifacts of Jharkhand. It provides deep insights into tribal customs.',
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
                images: ['https://picsum.photos/seed/santhal-tribe/300/200'],
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
                images: ['https://picsum.photos/seed/munda-tribe/300/200'],
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
                images: ['https://picsum.photos/seed/oraon-tribe/300/200'],
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
                images: ['https://picsum.photos/seed/sohrai-festival/300/200'],
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
                images: ['https://picsum.photos/seed/karam-festival/300/200'],
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
                images: ['https://picsum.photos/seed/chhau-dance/300/200'],
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
                images: ['https://picsum.photos/seed/sohrai-painting/300/200'],
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
