const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Destination = require('../models/Destination');
const connectDB = require('../config/database');

dotenv.config();

const sampleDestinations = [
  {
    title: "Hundru Falls",
    description: "One of the most spectacular waterfalls in Jharkhand, Hundru Falls is a breathtaking cascade that drops from a height of 98 meters. Located near Ranchi, this waterfall is formed by the Subarnarekha River as it flows over the rocky terrain. The waterfall is at its most magnificent during the monsoon season when the water volume is at its peak.\n\nThe surrounding area is rich in natural beauty with lush green forests and rocky landscapes. It's an ideal spot for nature lovers, photographers, and adventure enthusiasts. The best time to visit is during the monsoon and post-monsoon months when the waterfall is in full flow.",
    location: "Ranchi District, Jharkhand",
    coordinates: {
      latitude: 23.4241,
      longitude: 85.5797
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
        alt: "Hundru Falls cascading down rocky cliffs"
      }
    ],
    tags: ["waterfall", "nature", "photography", "adventure"],
    difficulty: "moderate",
    bestTime: "July to December",
    duration: "Half day",
    entryFee: "₹10 per person",
    facilities: ["parking", "restroom", "food"],
    rating: {
      average: 4.5,
      count: 127
    }
  },
  {
    title: "Dassam Falls",
    description: "Dassam Falls, also known as Dassam Ghagh, is a natural waterfall located on the Kanchi River, a tributary of the Subarnarekha River. The waterfall cascades from a height of about 144 feet, making it one of the tallest waterfalls in Jharkhand.\n\nSurrounded by dense forests and rocky terrain, Dassam Falls offers a perfect retreat for those seeking tranquility and natural beauty. The area around the falls is ideal for picnicking and photography. During monsoons, the waterfall transforms into a thunderous cascade, while in winter, the reduced water flow creates a more serene atmosphere.",
    location: "Taimara village, Bundu, Ranchi",
    coordinates: {
      latitude: 23.3833,
      longitude: 85.4167
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
        alt: "Dassam Falls surrounded by lush greenery"
      }
    ],
    tags: ["waterfall", "nature", "family-friendly", "photography"],
    difficulty: "easy",
    bestTime: "October to March",
    duration: "4-5 hours",
    entryFee: "₹15 per person",
    facilities: ["parking", "restroom", "food", "guide"],
    rating: {
      average: 4.2,
      count: 89
    }
  },
  {
    title: "Jagannath Temple, Ranchi",
    description: "The Jagannath Temple in Ranchi is a significant Hindu temple dedicated to Lord Jagannath, an incarnation of Lord Vishnu. Built in the traditional Kalinga style of architecture, this temple is inspired by the famous Jagannath Temple in Puri, Odisha.\n\nThe temple was constructed in 1691 and stands as a testament to the rich cultural heritage of Jharkhand. The annual Rath Yatra (Chariot Festival) is the most important celebration here, attracting thousands of devotees from across the state and neighboring regions. The temple complex also includes beautiful gardens and other smaller shrines.",
    location: "Ranchi, Jharkhand",
    coordinates: {
      latitude: 23.3441,
      longitude: 85.3096
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1605640844748-2653a46a94f7?w=800&h=600&fit=crop",
        alt: "Jagannath Temple with traditional architecture"
      }
    ],
    tags: ["temple", "religious", "cultural", "historical"],
    difficulty: "easy",
    bestTime: "October to March",
    duration: "2-3 hours",
    entryFee: "Free",
    facilities: ["parking", "restroom", "guide", "water"],
    rating: {
      average: 4.6,
      count: 234
    }
  },
  {
    title: "Betla National Park",
    description: "Betla National Park, located in the Palamu district, is the first national park established in Jharkhand. Spread over an area of 979 square kilometers, it was established in 1986 and is part of the Palamu Tiger Reserve.\n\nThe park is home to a diverse range of wildlife including tigers, elephants, leopards, sloth bears, wild boars, and various species of deer. The park also boasts a rich variety of bird life with over 180 species of birds. The landscape is characterized by dense forests, grasslands, and rocky hills, making it a paradise for wildlife enthusiasts and nature photographers.\n\nThe park also houses the historic Betla Fort, built during the Chero dynasty, adding historical significance to the natural beauty.",
    location: "Palamu District, Jharkhand",
    coordinates: {
      latitude: 23.8833,
      longitude: 84.1833
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&h=600&fit=crop",
        alt: "Wildlife and dense forests of Betla National Park"
      }
    ],
    tags: ["wildlife", "nature", "photography", "adventure", "forest"],
    difficulty: "moderate",
    bestTime: "November to April",
    duration: "Full day or 2 days",
    entryFee: "₹40 per person + vehicle charges",
    facilities: ["parking", "guide", "accommodation", "food"],
    rating: {
      average: 4.1,
      count: 156
    }
  },
  {
    title: "Patratu Valley",
    description: "Patratu Valley is a hidden gem located about 40 km from Ranchi. This scenic valley offers breathtaking views of rolling hills, dense forests, and the meandering Patratu River. The area is known for its pristine natural beauty and tranquil atmosphere, making it a perfect destination for those seeking peace and solitude.\n\nThe valley is surrounded by mountains and offers excellent opportunities for trekking, camping, and photography. The Patratu Dam adds to the scenic beauty of the area, creating a large reservoir that reflects the surrounding hills. During sunset and sunrise, the valley transforms into a magical landscape with golden hues painting the sky.",
    location: "Ramgarh District, Jharkhand",
    coordinates: {
      latitude: 23.6833,
      longitude: 85.7333
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&h=600&fit=crop",
        alt: "Scenic view of Patratu Valley with hills and river"
      }
    ],
    tags: ["nature", "trek", "photography", "offbeat", "river"],
    difficulty: "moderate",
    bestTime: "October to March",
    duration: "Full day",
    entryFee: "Free",
    facilities: ["parking", "food"],
    rating: {
      average: 4.3,
      count: 67
    }
  },
  {
    title: "Tribal Cultural Centre, Ranchi",
    description: "The Tribal Cultural Centre in Ranchi is a unique museum and cultural center dedicated to preserving and showcasing the rich tribal heritage of Jharkhand. The state is home to 32 different tribal communities, each with their own distinct culture, traditions, art, and lifestyle.\n\nThe center features extensive exhibits of tribal art, traditional costumes, musical instruments, weapons, household items, and religious artifacts. Interactive displays and dioramas help visitors understand the daily life and customs of various tribal communities. The center also organizes cultural programs, folk dance performances, and workshops to keep the tribal traditions alive.\n\nThis is an excellent place to learn about the indigenous culture of Jharkhand and understand the deep connection between tribal communities and nature.",
    location: "Ranchi, Jharkhand",
    coordinates: {
      latitude: 23.3441,
      longitude: 85.3096
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        alt: "Tribal artifacts and cultural displays"
      }
    ],
    tags: ["cultural", "tribal", "historical", "family-friendly"],
    difficulty: "easy",
    bestTime: "Year round",
    duration: "2-3 hours",
    entryFee: "₹20 per person",
    facilities: ["parking", "restroom", "guide", "electricity"],
    rating: {
      average: 4.4,
      count: 98
    }
  },
  {
    title: "Netarhat Hill Station",
    description: "Known as the 'Queen of Chotanagpur', Netarhat is a beautiful hill station located in the Latehar district of Jharkhand. Situated at an elevation of 1,128 meters above sea level, it offers respite from the heat of the plains and provides stunning panoramic views of the surrounding valleys and forests.\n\nNetarhat is famous for its spectacular sunrise and sunset views, which can be enjoyed from the Magnolia Point (Sunrise Point) and Sunset Point respectively. The hill station is surrounded by dense forests of sal, bamboo, and other tropical trees, making it a haven for nature lovers and wildlife enthusiasts.\n\nDuring winter months, the temperature can drop significantly, sometimes even experiencing frost, which is quite rare for this region of India. The area also houses a residential school established during the British era.",
    location: "Latehar District, Jharkhand",
    coordinates: {
      latitude: 23.4667,
      longitude: 84.2667
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        alt: "Sunrise view from Netarhat hill station"
      }
    ],
    tags: ["hill-station", "nature", "photography", "offbeat"],
    difficulty: "easy",
    bestTime: "October to February",
    duration: "2-3 days",
    entryFee: "Free",
    facilities: ["accommodation", "food", "electricity"],
    rating: {
      average: 4.7,
      count: 178
    }
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB for seeding');

    // Clear existing data
    await Destination.deleteMany({});
    console.log('Cleared existing destinations');

    // Create or find admin user for destinations
    let adminUser = await User.findOne({ email: 'admin@rootroutes.com' });
    
    if (!adminUser) {
      adminUser = await User.create({
        name: 'RootRoutes Admin',
        email: 'admin@rootroutes.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Created admin user');
    }

    // Add admin user ID to all destinations
    const destinationsWithAdmin = sampleDestinations.map(dest => ({
      ...dest,
      createdBy: adminUser._id
    }));

    // Insert sample destinations
    const destinations = await Destination.insertMany(destinationsWithAdmin);
    console.log(`Successfully seeded ${destinations.length} destinations`);

    console.log('\n=== SEED DATA SUMMARY ===');
    console.log(`Admin User: ${adminUser.email} (Password: admin123)`);
    console.log(`Destinations Created: ${destinations.length}`);
    
    destinations.forEach((dest, index) => {
      console.log(`${index + 1}. ${dest.title} - ${dest.location}`);
    });

    console.log('\n=== NEXT STEPS ===');
    console.log('1. Start the backend server: npm run dev');
    console.log('2. Start the frontend: cd ../frontend && npm run dev');
    console.log('3. Visit http://localhost:5173 to see the app');
    console.log('4. Register a new user or login with admin@rootroutes.com / admin123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();