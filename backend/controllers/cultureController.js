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
            // Heritage Sites
            {
                name: 'Baidyanath Temple Complex',
                location: 'Deoghar, Jharkhand',
                category: 'Religious Heritage',
                images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Baidyanath_Dham.jpg/1200px-Baidyanath_Dham.jpg'],
                description: 'One of the twelve Jyotirlingas, this sacred temple is a major pilgrimage site. It is famous for the Shravani Mela, where millions of devotees carry holy water from Sultanganj.',
                significance: 'Religious',
                period: '12th Century',
                rating: 4.8,
                visitors: '5M+ annually',
                googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Baidyanath+Temple+Deoghar'
            },
            {
                name: 'Jagannath Temple',
                location: 'Ranchi, Jharkhand',
                category: 'Religious Architecture',
                images: ['https://upload.wikimedia.org/wikipedia/commons/2/23/Jagannath_Temple_Ranchi.jpg'],
                description: 'A beautiful replica of the famous Puri Jagannath Temple, built in 1691 by King Ani Nath Shahdeo. The annual Rath Yatra here is a major attraction.',
                significance: 'Architectural',
                period: '1691 AD',
                rating: 4.6,
                visitors: '500K+ annually',
                googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jagannath+Temple+Ranchi'
            },
            {
                name: 'Maluti Temples',
                location: 'Dumka, Jharkhand',
                category: 'Historical',
                images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Maluti_Temples_1.jpg/1200px-Maluti_Temples_1.jpg'],
                description: 'A group of 72 extant terracotta temples (out of original 108) known as the "Village of Temples". They depict scenes from Ramayana and Mahabharata.',
                significance: 'Historical/Architectural',
                period: '17th-19th Century',
                rating: 4.5,
                visitors: '50K+ annually',
                googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Maluti+Temples+Dumka'
            },
            {
                name: 'Sun Temple',
                location: 'Ranchi, Jharkhand',
                category: 'Religious Architecture',
                images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Sun_Temple_Ranchi.jpg/1200px-Sun_Temple_Ranchi.jpg'],
                description: 'A uniquely designed temple shaped like a chariot with 18 wheels and 7 horses. It is a modern architectural marvel located on Tata Road.',
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
                images: ['https://upload.wikimedia.org/wikipedia/commons/d/d4/Chhinnamasta_Temple_Rajrappa.jpg'],
                description: 'Famous Shakti Peeth located at the confluence of Damodar and Bhairavi rivers. Dedicated to Goddess Chhinnamasta.',
                significance: 'Religious',
                period: 'Ancient',
                rating: 4.7,
                visitors: '1M+ annually',
                googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rajrappa+Temple+Jharkhand'
            },
            {
                name: 'Tribal Culture Museum',
                location: 'Ranchi, Jharkhand',
                category: 'Cultural Museum',
                images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Tribal_Museum_Ranchi.jpg/1200px-Tribal_Museum_Ranchi.jpg'],
                description: 'Showcases the rich tribal heritage, lifestyle, and artifacts of Jharkhand. It provides deep insights into the lives of Asurs, Mundas, Santhals, and more.',
                significance: 'Cultural',
                period: 'Contemporary',
                rating: 4.3,
                visitors: '100K+ annually',
                googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tribal+Museum+Ranchi'
            },
            {
                name: 'Palamu Forts',
                location: 'Palamu, Jharkhand',
                category: 'Historical',
                images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Palamu_Fort.jpg/1200px-Palamu_Fort.jpg'],
                description: 'Two historical forts (Old and New) located deep in the forests of Palamu Tiger Reserve. Built by the Chero dynasty kings.',
                significance: 'Historical',
                period: '17th Century',
                rating: 4.2,
                visitors: '30K+ annually',
                googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Palamu+Fort+Jharkhand'
            },

            // Tribes
            {
                name: 'Santhal Tribe',
                location: 'Eastern Jharkhand (Santhal Parganas)',
                category: 'Tribe',
                images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Santhal_Dance.jpg/1200px-Santhal_Dance.jpg'],
                description: 'The largest tribal community in Jharkhand. Known for their distinct language (Santhali), rich oral literature, music, and the Sohrai art form.',
                significance: 'Demographic',
                details: {
                    'Traditions': 'Sohrai Festival, Baha Festival',
                    'Crafts': 'Wall Paintings (Sohrai), Bamboo Work',
                    'Population': '2.8M'
                }
            },
            {
                name: 'Munda Tribe',
                location: 'Central Jharkhand (Chotanagpur Plateau)',
                category: 'Tribe',
                images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Munda_Tribe_Jharkhand.jpg/1200px-Munda_Tribe_Jharkhand.jpg'],
                description: 'One of the oldest tribes in India. They speak Mundari and are known for their agricultural festivals and the great leader Birsa Munda.',
                significance: 'Historical',
                details: {
                    'Traditions': 'Sarhul, Karam',
                    'Crafts': 'Wood Carving, Metal Work',
                    'Population': '~1.2M'
                }
            },
            {
                name: 'Oraon Tribe (Kurukh)',
                location: 'Ranchi, Gumla, Latehar',
                category: 'Tribe',
                images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Oraon_Dance.jpg/1200px-Oraon_Dance.jpg'],
                description: 'An agricultural tribe known for their progressive outlook and education. They perform the dynamic Karma dance.',
                significance: 'Cultural',
                details: {
                    'Traditions': 'Karma, Sarhul',
                    'Crafts': 'Textiles, Paitkar Painting',
                    'Population': '~1.7M'
                }
            },
            {
                name: 'Ho Tribe',
                location: 'West Singhbhum (Kolhan division)',
                category: 'Tribe',
                images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Ho_Tribe_people.jpg/1200px-Ho_Tribe_people.jpg'],
                description: 'Known for their martial arts heritage and distinct "Ho" language (Warang Citi script). They celebrate mage porob.',
                significance: 'Cultural',
                details: {
                    'Traditions': 'Mage Porob, Baa Porob',
                    'Crafts': 'Archery equipment, Tussar Silk',
                    'Population': '~1M'
                }
            },
            {
                name: 'Asur Tribe',
                location: 'Netarhat Plateau',
                category: 'Tribe',
                images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Asur_tribe.jpg/1200px-Asur_tribe.jpg'],
                description: 'Particularly Vulnerable Tribal Group (PVTG). They are traditional iron-smelters and are considered one of the most ancient tribes.',
                significance: 'Ancient Metallurgy',
                details: {
                    'Traditions': 'Iron Smelting rituals',
                    'Crafts': 'Iron tools, Metal crafts',
                    'Population': 'Very Small (<10K)'
                }
            },

            // Festivals
            {
                name: 'Sarhul',
                location: 'All Jharkhand',
                category: 'Festival',
                images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Sarhul_Festival_Ranchi.jpg/1200px-Sarhul_Festival_Ranchi.jpg'],
                description: 'The worship of the Sal tree, representing nature. Marked by the flowering of Sal trees (Shaloni). People dance in processions.',
                significance: 'Nature Worship',
                period: 'Annual (Spring)',
                details: {
                    'Season': 'March-April (Chaitra)',
                    'Duration': '3 Days'
                }
            },
            {
                name: 'Karam / Karma',
                location: 'All Jharkhand',
                category: 'Festival',
                images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Karma_Festival_Dance.jpg/1200px-Karma_Festival_Dance.jpg'],
                description: 'A festival of agricultural prosperity and sibling bond. A branch of the Karam tree is worshipped.',
                significance: 'Agricultural/Family',
                period: 'Annual',
                details: {
                    'Season': 'Aug-Sept (Bhado)',
                    'Duration': '1-3 Days'
                }
            },
            {
                name: 'Sohrai Festival',
                location: 'Rural Jharkhand',
                category: 'Festival',
                images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Sohrai_Painting_Process.jpg/1200px-Sohrai_Painting_Process.jpg'],
                description: 'Harvest festival celebrated right after Diwali. Known for cattle worship and the famous Sohrai wall paintings.',
                significance: 'Harvest & Art',
                period: 'Annual',
                details: {
                    'Season': 'October-November',
                    'Duration': '5-7 Days'
                }
            },
            {
                name: 'Tusu Parab',
                location: 'Singhbhum, Ranchi',
                category: 'Festival',
                images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Tusu_Parab_Chaudal.jpg/1200px-Tusu_Parab_Chaudal.jpg'],
                description: 'Harvest festival celebrated during Makar Sankranti. Famous for the "Chaudal" - colorful bamboo and paper structures immersed in rivers.',
                significance: 'Harvest',
                period: 'Annual',
                details: {
                    'Season': 'January (Makar Sankranti)',
                    'Duration': '1 Month (preparation)'
                }
            },

            // Art Forms
            {
                name: 'Chhau Dance',
                location: 'Seraikela',
                category: 'Art Form',
                images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Chhau_mask_dance.jpg/1200px-Chhau_mask_dance.jpg'],
                description: 'UNESCO Intangible Cultural Heritage. A masked martial dance form depicting stories from epics. The Seraikela Chhau uses elaborate masks.',
                significance: 'World Heritage',
                period: 'Ancient',
                details: {
                    'Materials': 'Paper Maché Masks, Costumes',
                    'Style': 'Martial/Semi-classical'
                }
            },
            {
                name: 'Sohrai & Khovar Painting',
                location: 'Hazaribagh',
                category: 'Art Form',
                images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Sohrai_Art_Wall.jpg/1200px-Sohrai_Art_Wall.jpg'],
                description: 'GI Tagged Art Form. Sohrai is harvest art (animals, nature), while Khovar is marriage art (symbols of fertility). Done on mud walls.',
                significance: 'GI Tagged Folk Art',
                period: 'Traditional',
                details: {
                    'Materials': 'Natural Earth Colors (Mud)',
                    'Style': 'Mural/Wall Painting'
                }
            },
            {
                name: 'Dokra Art',
                location: 'Singhbhum region',
                category: 'Art Form',
                images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Dhokra_Damar_tribes_at_work.jpg/1200px-Dhokra_Damar_tribes_at_work.jpg'],
                description: 'Ancient "lost-wax" metal casting technique used to make figurines, jewelry, and idols. It dates back to the Mohenjo-Daro era.',
                significance: 'Metal Craft',
                period: 'Ancient (4000+ years)',
                details: {
                    'Materials': 'Brass, Beeswax, Clay',
                    'Style': 'Metal Casting'
                }
            },
            {
                name: 'Paitkar Painting',
                location: 'Amadubi Village (East Singhbhum)',
                category: 'Art Form',
                images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Paitkar_Painting.jpg/1200px-Paitkar_Painting.jpg'],
                description: 'Known as the "Scroll Paintings of Jharkhand". One of the oldest tribal paintings in India, depicting life after death and tribal legends.',
                significance: 'Endangered Folk Art',
                period: 'Ancient',
                details: {
                    'Materials': 'Natural Colors, Paper/Cloth Scrolls',
                    'Style': 'Scroll Painting'
                }
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
