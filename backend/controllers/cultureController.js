const Culture = require('../models/Culture');

// @desc    Get all cultural sites
// @route   GET /api/culture
// @access  Public
exports.getAllCulture = async (req, res) => {
    try {
        const { category, keyword } = req.query;
        let query = {};

        if (category && category !== 'All') {
            query.category = category;
        }

        if (keyword) {
            query.$text = { $search: keyword };
        }

        const sites = await Culture.find(query);

        res.status(200).json({
            success: true,
            count: sites.length,
            data: sites
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Get single cultural site
// @route   GET /api/culture/:id
// @access  Public
exports.getCultureById = async (req, res) => {
    try {
        const site = await Culture.findById(req.params.id);

        if (!site) {
            return res.status(404).json({
                success: false,
                message: 'Cultural site not found'
            });
        }

        res.status(200).json({
            success: true,
            data: site
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Create new cultural site
// @route   POST /api/culture
// @access  Private/Admin (Public for now as per plan logic if auth not strictly enforced for seeding)
exports.createCulture = async (req, res) => {
    try {
        const site = await Culture.create(req.body);

        res.status(201).json({
            success: true,
            data: site
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Seed initial data
// @route   POST /api/culture/seed
// @access  Public (Dev only)
exports.seedCulture = async (req, res) => {
    try {
        await Culture.deleteMany(); // Clear existing

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
                googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Baidyanath+Temple+Deoghar'
            },
            {
                name: 'Jagannath Temple',
                location: 'Ranchi, Jharkhand',
                category: 'Religious Architecture',
                images: ['https://images.unsplash.com/photo-1580800917294-d884c7780b2a?w=400&h=300&fit=crop'],
                description: 'A beautiful replica of the famous Puri Jagannath Temple, built in 1691 by King Ani Nath Shahdeo.',
                significance: 'Architectural',
                period: '20th Century (Restored)', // or 17th Century based on history
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
            // Festivals
            {
                name: 'Sohrai Festival',
                location: 'All Jharkhand',
                category: 'Festival',
                images: ['https://images.unsplash.com/photo-1544967888-b9eb7073aa77?w=300&h=200&fit=crop'],
                description: 'Harvest festival celebrated with colorful wall paintings and cattle worship.',
                significance: 'Harvest Celebration',
                period: 'Annual',
                details: {
                    'Season': 'October-November',
                    'Duration': '7 days'
                }
            },
            {
                name: 'Chhau Dance',
                location: 'Seraikela, Jharkhand',
                category: 'Art Form',
                images: ['https://upload.wikimedia.org/wikipedia/commons/e/e6/Chhau_Dance.jpg'], // Placeholder or real URL if available
                description: 'A semi-classical Indian dance with martial, tribal, and folk origins. In 2010 the Chhau dance was inscribed in the UNESCOs Representative List of the Intangible Cultural Heritage of Humanity.',
                significance: 'Cultural Heritage',
                period: 'Ancient',
                googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Seraikela+Jharkhand'
            }
        ];

        await Culture.insertMany(initialData);

        res.status(201).json({
            success: true,
            message: 'Data seeded successfully',
            data: initialData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Seed failed',
            error: error.message
        });
    }
};
