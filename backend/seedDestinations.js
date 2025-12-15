const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Destination = require('./models/Destination');
const User = require('./models/User');

dotenv.config();

const destinations = [
    {
        title: 'Betla National Park',
        description: 'One of the first national parks in India to become a tiger reserve under Project Tiger. It features lush forests, diverse wildlife, and the historic Palamu Forts.',
        history: 'The park was established in 1974 and was one of the first 9 tiger reserves under Project Tiger. The region has a rich history dating back to the Chero dynasty, evidenced by the 16th-century Palamu Forts located within the park.',
        famousFor: 'Tigers, Elephants, Palamu Forts, Wildlife Safari',
        location: 'Latehar, Jharkhand',
        coordinates: {
            latitude: 23.8878,
            longitude: 84.1903
        },
        images: [
            { url: 'https://picsum.photos/seed/betla1/800/600', alt: 'Betla National Park landscape' },
            { url: 'https://picsum.photos/seed/betla2/800/600', alt: 'Wildlife at Betla National Park' },
            { url: 'https://picsum.photos/seed/betla3/800/600', alt: 'Betla forest trail' }
        ],
        tags: ['wildlife', 'forest', 'historical', 'adventure', 'nature'],
        difficulty: 'easy',
        bestTime: 'October to March',
        duration: '1-2 days',
        entryFee: '₹100 for Indians, ₹500 for Foreigners',
        facilities: ['guide', 'accommodation', 'food', 'transport']
    },
    {
        title: 'Dassam Falls',
        description: 'A spectacular waterfall where the Kanchi River falls from a height of 144 feet. The name "Dassam" means "ten streams" in the local language.',
        history: 'The waterfall is a natural formation on the Kanchi River, a tributary of the Subarnarekha River. It has been a popular spot for locals and tourists for decades due to its scenic beauty.',
        famousFor: 'Scenic Beauty, Picnic Spot, Photography',
        location: 'Ranchi, Jharkhand',
        coordinates: {
            latitude: 23.1467,
            longitude: 85.5417
        },
        images: [
            { url: 'https://picsum.photos/seed/waterfall1/800/600', alt: 'Dassam Falls cascade' },
            { url: 'https://picsum.photos/seed/waterfall2/800/600', alt: 'Dassam Falls surrounded by nature' },
            { url: 'https://picsum.photos/seed/waterfall3/800/600', alt: 'Dassam Falls view' }
        ],
        tags: ['waterfall', 'nature', 'picnic', 'photography'],
        difficulty: 'easy',
        bestTime: 'September to March',
        duration: '3-4 hours',
        entryFee: 'Free',
        facilities: ['parking', 'food']
    },
    {
        title: 'Baidyanath Dham',
        description: 'One of the twelve Jyotirlingas, the most sacred abodes of Shiva. It is a significant pilgrimage site, especially during the Shravan month.',
        history: 'According to Hindu mythology, Ravana worshipped Shiva here to get his blessings. The temple complex is ancient and has been a center of pilgrimage for centuries.',
        famousFor: 'Jyotirlinga, Pilgrimage, Shravani Mela',
        location: 'Deoghar, Jharkhand',
        coordinates: {
            latitude: 24.4939,
            longitude: 86.6997
        },
        images: [
            { url: 'https://picsum.photos/seed/temple1/800/600', alt: 'Baidyanath Dham temple' },
            { url: 'https://picsum.photos/seed/temple2/800/600', alt: 'Baidyanath temple architecture' },
            { url: 'https://picsum.photos/seed/temple3/800/600', alt: 'Devotees at Baidyanath Dham' }
        ],
        tags: ['religious', 'temple', 'cultural', 'historical'],
        difficulty: 'easy',
        bestTime: 'October to March (Avoid Shravan for crowds)',
        duration: '1 day',
        entryFee: 'Free (VIP Darshan available)',
        facilities: ['accommodation', 'food', 'transport', 'shops']
    },
    {
        title: 'Hundru Falls',
        description: 'The 34th highest waterfall in India, where the Subarnarekha River falls from a height of 320 feet. It creates a spectacular scene and a pool at the base.',
        history: 'Formed by the Subarnarekha River as it descends through the Ranchi Plateau. It is one of the most famous waterfalls in the region.',
        famousFor: 'High Waterfall, Rock Formations, Picnic',
        location: 'Ranchi, Jharkhand',
        coordinates: {
            latitude: 23.4447,
            longitude: 85.6544
        },
        images: [
            { url: 'https://picsum.photos/seed/waterfall1/800/600', alt: 'Hundru Falls from top' },
            { url: 'https://picsum.photos/seed/dam1/800/600', alt: 'Hundru Falls cascade' },
            { url: 'https://picsum.photos/seed/waterfall3/800/600', alt: 'Hundru Falls rock formations' }
        ],
        tags: ['waterfall', 'nature', 'adventure', 'photography'],
        difficulty: 'moderate',
        bestTime: 'August to March',
        duration: '4-5 hours',
        entryFee: '₹20',
        facilities: ['parking', 'food', 'restroom']
    },
    {
        title: 'Parasnath Hills (Shikharji)',
        description: 'The highest mountain peak in Jharkhand and a major Jain pilgrimage site. Twenty of the twenty-four Jain Tirthankaras attained salvation here.',
        history: 'An ancient pilgrimage site for Jains, dating back thousands of years. The hill is named after the 23rd Tirthankara, Parshvanatha.',
        famousFor: 'Jain Pilgrimage, Trekking, Highest Peak',
        location: 'Giridih, Jharkhand',
        coordinates: {
            latitude: 23.9636,
            longitude: 86.1286
        },
        images: [
            { url: 'https://picsum.photos/seed/hill1/800/600', alt: 'Parasnath Hills peak' },
            { url: 'https://picsum.photos/seed/hill2/800/600', alt: 'Parasnath Hills mountain view' },
            { url: 'https://picsum.photos/seed/hill3/800/600', alt: 'Parasnath Hills trekking trail' }
        ],
        tags: ['religious', 'trek', 'mountain', 'historical'],
        difficulty: 'difficult',
        bestTime: 'October to March',
        duration: '1-2 days',
        entryFee: 'Free',
        facilities: ['accommodation', 'food', 'water', 'doli-service']
    },
    {
        title: 'Netarhat',
        description: 'Known as the "Queen of Chotanagpur," it is a hill station famous for its sunrise and sunset views, particularly from Magnolia Point.',
        history: 'Developed as a hill station during the British Raj. The name Netarhat is believed to mean "Market of Bamboo" or "Nature\'s Heart".',
        famousFor: 'Sunrise/Sunset, Hill Station, Pine Forests',
        location: 'Latehar, Jharkhand',
        coordinates: {
            latitude: 23.4833,
            longitude: 84.2667
        },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Netarhat hill station view' },
            { url: 'https://picsum.photos/800/600', alt: 'Netarhat sunrise' },
            { url: 'https://picsum.photos/800/600', alt: 'Netarhat pine forests' }
        ],
        tags: ['hill-station', 'nature', 'romantic', 'photography'],
        difficulty: 'easy',
        bestTime: 'Year-round',
        duration: '2-3 days',
        entryFee: 'Free',
        facilities: ['accommodation', 'food', 'viewpoints']
    },
    {
        title: 'Jonha Falls',
        description: 'Also known as Gautamdhara Falls, it is believed that Lord Buddha bathed here. The water falls from a height of 43 meters.',
        history: 'The falls are associated with Lord Buddha, and there is a temple dedicated to him nearby. It is a significant cultural and natural site.',
        famousFor: 'Buddha Temple, Waterfall, Scenic Beauty',
        location: 'Ranchi, Jharkhand',
        coordinates: {
            latitude: 23.4167,
            longitude: 85.6000
        },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Jonha Falls waterfall' },
            { url: 'https://picsum.photos/800/600', alt: 'Jonha Falls Buddha temple' },
            { url: 'https://picsum.photos/800/600', alt: 'Jonha Falls surroundings' }
        ],
        tags: ['waterfall', 'religious', 'nature', 'picnic'],
        difficulty: 'easy',
        bestTime: 'September to March',
        duration: '3-4 hours',
        entryFee: '₹20',
        facilities: ['parking', 'restroom', 'food']
    },
    {
        title: 'Maluti Temples',
        description: 'A village with a cluster of 72 extant terracotta temples (out of original 108) built between the 17th and 19th centuries.',
        history: 'Built by the kings of the Baj Basanta dynasty. The temples depict scenes from Hindu mythology, including the Ramayana and Mahabharata, in terracotta.',
        famousFor: 'Terracotta Temples, Architecture, Heritage',
        location: 'Dumka, Jharkhand',
        coordinates: {
            latitude: 24.1667,
            longitude: 87.6833
        },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Maluti Temples terracotta architecture' },
            { url: 'https://picsum.photos/800/600', alt: 'Maluti temple complex' },
            { url: 'https://picsum.photos/800/600', alt: 'Maluti Temples heritage site' }
        ],
        tags: ['historical', 'temple', 'architecture', 'cultural'],
        difficulty: 'easy',
        bestTime: 'October to March',
        duration: '1 day',
        entryFee: 'Free',
        facilities: ['guide', 'local-food']
    },
    {
        title: 'Patratu Valley',
        description: 'A scenic valley with winding roads and the Patratu Dam. It offers breathtaking views and is a popular spot for driving and photography.',
        history: 'The dam was built to supply water to the Patratu Thermal Power Station. The valley road is a modern engineering marvel offering scenic vistas.',
        famousFor: 'Winding Roads, Dam, Boating, Scenic Views',
        location: 'Ramgarh, Jharkhand',
        coordinates: {
            latitude: 23.6333,
            longitude: 85.2833
        },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Patratu Valley winding roads' },
            { url: 'https://picsum.photos/800/600', alt: 'Patratu Dam reservoir' },
            { url: 'https://picsum.photos/800/600', alt: 'Patratu Valley scenic view' }
        ],
        tags: ['nature', 'adventure', 'photography', 'dam'],
        difficulty: 'easy',
        bestTime: 'Year-round',
        duration: '1 day',
        entryFee: 'Free',
        facilities: ['boating', 'food', 'parking']
    },
    {
        title: 'Tagore Hill',
        description: 'A hill associated with Rabindranath Tagore, who is believed to have written parts of Gitanjali here. It offers a panoramic view of Ranchi.',
        history: 'The hill was the ashram of Jyotirindranath Tagore, Rabindranath Tagore\'s elder brother. It has a rich literary and cultural history.',
        famousFor: 'Tagore Connection, Viewpoint, Peace',
        location: 'Ranchi, Jharkhand',
        coordinates: {
            latitude: 23.3833,
            longitude: 85.3333
        },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Tagore Hill viewpoint' },
            { url: 'https://picsum.photos/800/600', alt: 'Tagore Hill panoramic view' }
        ],
        tags: ['historical', 'cultural', 'viewpoint', 'nature'],
        difficulty: 'easy',
        bestTime: 'Year-round',
        duration: '1-2 hours',
        entryFee: 'Free',
        facilities: ['parking', 'seating']
    },
    {
        title: 'Lodh Falls',
        description: 'The highest waterfall in Jharkhand, falling from 468 feet. It is located in the midst of dense forests.',
        history: 'A natural wonder located deep within the forest. It is less commercialized and offers a pristine nature experience.',
        famousFor: 'Highest Waterfall, Nature, Trekking',
        location: 'Latehar, Jharkhand',
        coordinates: {
            latitude: 23.5333,
            longitude: 84.1833
        },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Lodh Falls highest waterfall' },
            { url: 'https://picsum.photos/800/600', alt: 'Lodh Falls forest view' },
            { url: 'https://picsum.photos/800/600', alt: 'Lodh Falls cascade' }
        ],
        tags: ['waterfall', 'trek', 'nature', 'adventure'],
        difficulty: 'moderate',
        bestTime: 'August to February',
        duration: '1 day',
        entryFee: 'Free',
        facilities: ['none']
    },
    {
        title: 'Dalma Wildlife Sanctuary',
        description: 'A sanctuary known for its significant population of Indian elephants. It also houses barking deer, sloth bears, and porcupines.',
        history: 'Inaugurated in 1975 by Sanjay Gandhi. It is a significant habitat for elephants and offers a unique wildlife experience near Jamshedpur.',
        famousFor: 'Elephants, Wildlife, Trekking',
        location: 'Jamshedpur, Jharkhand',
        coordinates: {
            latitude: 22.9000,
            longitude: 86.2000
        },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Dalma Wildlife Sanctuary elephants' },
            { url: 'https://picsum.photos/800/600', alt: 'Dalma forest trail' },
            { url: 'https://picsum.photos/800/600', alt: 'Dalma wildlife view' }
        ],
        tags: ['wildlife', 'forest', 'trek', 'nature'],
        difficulty: 'moderate',
        bestTime: 'October to June',
        duration: '1 day',
        entryFee: '₹50',
        facilities: ['accommodation', 'guide', 'safari']
    },
    {
        title: 'Jubilee Park',
        description: 'A massive park in Jamshedpur, modeled after the Brindavan Gardens of Mysore. It features fountains, a zoo, and a lake.',
        history: 'Gifted by the Tata Steel Company to the citizens of Jamshedpur on its Golden Jubilee in 1958. It is a symbol of the city\'s industrial and cultural growth.',
        famousFor: 'Gardens, Zoo, Fountains, Recreation',
        location: 'Jamshedpur, Jharkhand',
        coordinates: {
            latitude: 22.8167,
            longitude: 86.1833
        },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Jubilee Park garden ' },
            { url: 'https://picsum.photos/800/600', alt: 'Jubilee Park fountains' },
            { url: 'https://picsum.photos/800/600', alt: 'Jubilee Park lake view' }
        ],
        tags: ['family-friendly', 'nature', 'park', 'recreation'],
        difficulty: 'easy',
        bestTime: 'Year-round',
        duration: '2-3 hours',
        entryFee: 'Free (Zoo entry separate)',
        facilities: ['restroom', 'food', 'parking', 'benches']
    },
    {
        title: 'Jagannath Temple',
        description: 'A 17th-century temple dedicated to Lord Jagannath, built by King Ani Nath Shahdeo. It is a replica of the Puri Jagannath Temple.',
        history: 'Built in 1691. It collapsed in 1990 and was reconstructed. It hosts a massive Rath Yatra every year.',
        famousFor: 'Rath Yatra, Architecture, Hilltop View',
        location: 'Ranchi, Jharkhand',
        coordinates: {
            latitude: 23.3169,
            longitude: 85.2817
        },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Jagannath Temple architecture' },
            { url: 'https://picsum.photos/800/600', alt: 'Jagannath Temple complex' },
            { url: 'https://picsum.photos/800/600', alt: 'Jagannath Temple Rath Yatra' }
        ],
        tags: ['religious', 'temple', 'historical', 'cultural'],
        difficulty: 'easy',
        bestTime: 'Year-round',
        duration: '1-2 hours',
        entryFee: 'Free',
        facilities: ['parking', 'shops']
    },
    {
        title: 'Maithon Dam',
        description: 'Located on the Barakar River, it offers a scenic lake for boating and is famous for its underground power station.',
        history: 'Built in 1948 by DVC for flood control. It was the first of its kind in South Asia.',
        famousFor: 'Boating, Underground Power Station, Picnic',
        location: 'Dhanbad, Jharkhand',
        coordinates: {
            latitude: 23.7833,
            longitude: 86.8000
        },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Maithon Dam reservoir' },
            { url: 'https://picsum.photos/800/600', alt: 'Maithon Dam boating' },
            { url: 'https://picsum.photos/800/600', alt: 'Maithon Dam scenic view' }
        ],
        tags: ['nature', 'dam', 'boating', 'picnic'],
        difficulty: 'easy',
        bestTime: 'October to March',
        duration: '3-4 hours',
        entryFee: 'Free',
        facilities: ['boating', 'food', 'parking']
    },
    {
        title: 'Pahari Mandir',
        description: 'A temple dedicated to Lord Shiva situated on a hill. It offers a panoramic view of Ranchi city.',
        history: 'During British rule, it was used to hang freedom fighters. After independence, it became a symbol of patriotism.',
        famousFor: 'Shiva Temple, City View, Patriotism',
        location: 'Ranchi, Jharkhand',
        coordinates: {
            latitude: 23.3754,
            longitude: 85.3108
        },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Pahari Mandir temple' },
            { url: 'https://picsum.photos/800/600', alt: 'Pahari Mandir hilltop view' },
            { url: 'https://picsum.photos/800/600', alt: 'Pahari Mandir stairs' }
        ],
        tags: ['religious', 'viewpoint', 'historical'],
        difficulty: 'moderate',
        bestTime: 'Year-round',
        duration: '1-2 hours',
        entryFee: 'Free',
        facilities: ['parking', 'water']
    },
    {
        title: 'Rajrappa Temple',
        description: 'A famous Shakti Peeth dedicated to Goddess Chinnamasta, located at the confluence of Damodar and Bhairavi rivers.',
        history: 'An ancient temple mentioned in Hindu scriptures. It is a significant tantric site.',
        famousFor: 'Chinnamasta Temple, River Confluence, Tantric Worship',
        location: 'Ramgarh, Jharkhand',
        coordinates: {
            latitude: 23.6190,
            longitude: 85.7170
        },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Rajrappa Temple' },
            { url: 'https://picsum.photos/800/600', alt: 'Rajrappa temple architecture' },
            { url: 'https://picsum.photos/800/600', alt: 'Rajrappa river confluence' }
        ],
        tags: ['religious', 'temple', 'river'],
        difficulty: 'easy',
        bestTime: 'Year-round',
        duration: '2-3 hours',
        entryFee: 'Free',
        facilities: ['parking', 'food', 'shops']
    },
    {
        title: 'Hazaribagh National Park',
        description: 'A wildlife sanctuary with scenic hills and forests, home to sambar, nilgai, chital, and peafowl.',
        history: 'Established in 1954. The name means "City of a Thousand Gardens".',
        famousFor: 'Wildlife, Scenic Drive, Nature',
        location: 'Hazaribagh, Jharkhand',
        coordinates: {
            latitude: 24.1352,
            longitude: 85.3553
        },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Hazaribagh National Park forest' },
            { url: 'https://picsum.photos/800/600', alt: 'Hazaribagh wildlife' },
            { url: 'https://picsum.photos/800/600', alt: 'Hazaribagh scenic hills' }
        ],
        tags: ['wildlife', 'forest', 'nature'],
        difficulty: 'easy',
        bestTime: 'October to March',
        duration: '1 day',
        entryFee: '₹50',
        facilities: ['accommodation', 'guide']
    },
    {
        title: 'Kanke Dam',
        description: 'A popular spot for sunset views and evening walks, with the Gonda Hill acting as a backdrop.',
        history: 'Built in 1955 to supply water to Ranchi.',
        famousFor: 'Sunset, Rock Garden, Boating',
        location: 'Ranchi, Jharkhand',
        coordinates: {
            latitude: 23.4345,
            longitude: 85.3207
        },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Kanke Dam sunset' },
            { url: 'https://picsum.photos/800/600', alt: 'Kanke Dam lake view' },
            { url: 'https://picsum.photos/800/600', alt: 'Kanke Dam boating' }
        ],
        tags: ['nature', 'picnic', 'lake'],
        difficulty: 'easy',
        bestTime: 'Year-round',
        duration: '1-2 hours',
        entryFee: 'Free',
        facilities: ['parking', 'food', 'boating']
    },
    {
        title: 'Birsa Zoological Park',
        description: 'A large zoo housing tigers, lions, elephants, and various bird species in a natural habitat.',
        history: 'Named after the freedom fighter Birsa Munda. It focuses on wildlife conservation.',
        famousFor: 'Zoo, Tigers, Family Outing',
        location: 'Ranchi, Jharkhand',
        coordinates: {
            latitude: 23.4244,
            longitude: 85.3524
        },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Birsa Zoological Park animals' },
            { url: 'https://picsum.photos/800/600', alt: 'Birsa Zoo tigers' },
            { url: 'https://images. unsplash.com/photo-1564760055775-d63b17a55c44?w=800&h=600&fit=crop&q=80', alt: 'Birsa Zoo family visit' }
        ],
        tags: ['wildlife', 'family-friendly', 'zoo'],
        difficulty: 'easy',
        bestTime: 'Year-round',
        duration: '3-4 hours',
        entryFee: '₹30',
        facilities: ['parking', 'food', 'restroom']
    },
    {
        title: 'Sun Temple',
        description: 'A magnificent temple designed in the shape of a chariot with 18 wheels and 7 horses.',
        history: 'Built by the Sanskriti Vihar. It is a modern architectural marvel.',
        famousFor: 'Architecture, Chhath Puja, Pond',
        location: 'Ranchi, Jharkhand',
        coordinates: {
            latitude: 23.1800,
            longitude: 85.4500
        },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Sun Temple chariot design' },
            { url: 'https://picsum.photos/800/600', alt: 'Sun Temple architecture' },
            { url: 'https://picsum.photos/800/600', alt: 'Sun Temple complex' }
        ],
        tags: ['religious', 'architecture', 'cultural'],
        difficulty: 'easy',
        bestTime: 'Year-round',
        duration: '1 hour',
        entryFee: 'Free',
        facilities: ['parking', 'food']
    },
    {
        title: 'Dimna Lake',
        description: 'An artificial lake at the foothills of Dalma range, offering water sports and scenic views.',
        history: 'Built by Tata Steel for water supply.',
        famousFor: 'Picnic, Boating, Scenic Beauty',
        location: 'Jamshedpur, Jharkhand',
        coordinates: {
            latitude: 22.8600,
            longitude: 86.2500
        },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Dimna Lake serene view' },
            { url: 'https://picsum.photos/800/600', alt: 'Dimna Lake water sports' },
            { url: 'https://picsum.photos/800/600', alt: 'Dimna Lake hills' }
        ],
        tags: ['nature', 'lake', 'picnic'],
        difficulty: 'easy',
        bestTime: 'October to March',
        duration: '2-3 hours',
        entryFee: 'Free',
        facilities: ['parking', 'boating']
    },
    {
        title: 'Massanjore Dam',
        description: 'Also known as Canada Dam, it is located on the Mayurakshi River and offers spectacular views.',
        history: 'Built with Canadian aid in 1955.',
        famousFor: 'Dam, Scenic View, Boating',
        location: 'Dumka, Jharkhand',
        coordinates: {
            latitude: 24.1100,
            longitude: 87.3000
        },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Massanjore Dam aerial view' },
            { url: 'https://picsum.photos/800/600', alt: 'Massanjore Dam boating' },
            { url: 'https://picsum.photos/800/600', alt: 'Massanjore Dam scenic' }
        ],
        tags: ['nature', 'dam', 'picnic'],
        difficulty: 'easy',
        bestTime: 'Year-round',
        duration: '2-3 hours',
        entryFee: 'Free',
        facilities: ['parking', 'boating', 'food']
    },
    {
        title: 'Ranchi Hill',
        description: 'A historical hill with a temple dedicated to Lord Shiva. Offers panoramic views of Ranchi city.',
        history: 'The hill has been a landmark since ancient times. The British used it for signaling during their rule.',
        famousFor: 'Shiva Temple, City Views, Trekking',
        location: 'Ranchi, Jharkhand',
        coordinates: { latitude: 23.3645, longitude: 85.3342 },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Ranchi Hill view' },
            { url: 'https://picsum.photos/800/600', alt: 'Ranchi Hill temple' },
            { url: 'https://picsum.photos/800/600', alt: 'Ranchi Hill panorama' }
        ],
        tags: ['trek', 'religious', 'viewpoint', 'nature'],
        difficulty: 'moderate',
        bestTime: 'October to March',
        duration: '2-3 hours',
        entryFee: 'Free',
        facilities: ['parking', 'water']
    },
    {
        title: 'McCluskieganj',
        description: 'A British-era Anglo-Indian settlement known for its colonial architecture and serene environment.',
        history: 'Founded in 1933 by Ernest Timothy McCluskie for Anglo-Indians. Still retains its colonial charm.',
        famousFor: 'Colonial Heritage, Churches, Peace',
        location: 'Ranchi, Jharkhand',
        coordinates: { latitude: 23.6167, longitude: 85.1333 },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'McCluskieganj colonial architecture' },
            { url: 'https://picsum.photos/800/600', alt: 'McCluskieganj church' }
        ],
        tags: ['historical', 'cultural', 'offbeat'],
        difficulty: 'easy',
        bestTime: 'Year-round',
        duration: '1 day',
        entryFee: 'Free',
        facilities: ['accommodation', 'food']
    },
    {
        title: 'Tilaiya Dam',
        description: 'Built on Barakar River, offers scenic beauty with boating and water sports facilities.',
        history: 'Constructed in 1953 by DVC for irrigation and power generation.',
        famousFor: 'Boating, Picnic, Scenic Views',
        location: 'Koderma, Jharkhand',
        coordinates: { latitude: 24.3667, longitude: 85.7167 },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Tilaiya Dam view' },
            { url: 'https://picsum.photos/800/600', alt: 'Tilaiya Dam boating' },
            { url: 'https://picsum.photos/800/600', alt: 'Tilaiya Dam reservoir' }
        ],
        tags: ['nature', 'dam', 'boating', 'picnic'],
        difficulty: 'easy',
        bestTime: 'October to March',
        duration: '1 day',
        entryFee: 'Free',
        facilities: ['boating', 'food', 'parking']
    },
    {
        title: 'Panchet Dam',
        description: 'Large dam on Damodar River creating a vast reservoir, ideal for water sports.',
        history: 'Built in 1959 as part of the Damodar Valley Project.',
        famousFor: 'Water Sports, Boating, Fishing',
        location: 'Dhanbad, Jharkhand',
        coordinates: { latitude: 23.6667, longitude: 86.7333 },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Panchet Dam water view' },
            { url: 'https://picsum.photos/800/600', alt: 'Panchet Dam boats' },
            { url: 'https://picsum.photos/800/600', alt: 'Panchet Dam fishing' }
        ],
        tags: ['nature', 'dam', 'adventure'],
        difficulty: 'easy',
        bestTime: 'Year-round',
        duration: '1 day',
        entryFee: 'Free',
        facilities: ['boating', 'parking', 'food']
    },
    {
        title: 'Topchanchi Lake',
        description: 'A beautiful lake surrounded by hills, popular for picnics and boating.',
        history: 'Natural lake developed as a tourist spot in the 1960s.',
        famousFor: 'Lake, Boating, Hills',
        location: 'Dhanbad, Jharkhand',
        coordinates: { latitude: 23.8833, longitude: 86.3833 },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Topchanchi Lake hills' },
            { url: 'https://picsum.photos/800/600', alt: 'Topchanchi Lake boating' },
            { url: 'https://picsum.photos/800/600', alt: 'Topchanchi Lake scenic' }
        ],
        tags: ['nature', 'lake', 'picnic'],
        difficulty: 'easy',
        bestTime: 'October to March',
        duration: '1 day',
        entryFee: 'Free',
        facilities: ['boating', 'food', 'parking']
    },
    {
        title: 'Palkot Wildlife Sanctuary',
        description: 'A lesser-known sanctuary with diverse flora and fauna in dense forests.',
        history: 'Established to protect the biodiversity of the Palkot region.',
        famousFor: 'Wildlife, Trekking, Bird Watching',
        location: 'Gumla, Jharkhand',
        coordinates: { latitude: 23.2333, longitude: 84.6833 },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Palkot Wildlife Sanctuary forest' },
            { url: 'https://picsum.photos/800/600', alt: 'Palkot  wildlife' },
            { url: 'https://picsum.photos/800/600', alt: 'Palkot bird watching' }
        ],
        tags: ['wildlife', 'forest', 'trek', 'offbeat'],
        difficulty: 'moderate',
        bestTime: 'November to March',
        duration: '1 day',
        entryFee: '₹50',
        facilities: ['guide']
    },
    {
        title: 'Chandil Dam',
        description: 'Scenic dam providing irrigation and drinking water, popular picnic spot.',
        history: 'Constructed on Subarnarekha River in 1982.',
        famousFor: 'Dam, Boating, Scenic Beauty',
        location: 'Seraikela-Kharsawan, Jharkhand',
        coordinates: { latitude: 22.9667, longitude: 86.0500 },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Chandil Dam view' },
            { url: 'https://picsum.photos/800/600', alt: 'Chandil Dam water' },
            { url: 'https://picsum.photos/800/600', alt: 'Chandil Dam scenic' }
        ],
        tags: ['nature', 'dam', 'picnic'],
        difficulty: 'easy',
        bestTime: 'Year-round',
        duration: '2-3 hours',
        entryFee: 'Free',
        facilities: ['parking', 'food']
    },
    {
        title: 'Tata Steel Zoological Park',
        description: 'Well-maintained zoo with diverse animal species in natural habitats.',
        history: 'Established by Tata Steel as part of corporate social responsibility.',
        famousFor: 'Zoo, Wildlife Conservation',
        location: 'Jamshedpur, Jharkhand',
        coordinates: { latitude: 22.8046, longitude: 86.2029 },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Tata Steel Zoo animals' },
            { url: 'https://picsum.photos/800/600', alt: 'Tata Zoo wildlife' },
            { url: 'https://picsum.photos/800/600', alt: 'Tata Zoo visit' }
        ],
        tags: ['wildlife', 'family-friendly', 'zoo'],
        difficulty: 'easy',
        bestTime: 'Year-round',
        duration: '3-4 hours',
        entryFee: '₹25',
        facilities: ['parking', 'food', 'restroom']
    },
    {
        title: 'Ranchi Lake',
        description: 'Artificial lake in the heart of Ranchi, perfect for evening walks and boating.',
        history: 'Built by Colonel Onsely in 1842.',
        famousFor: 'Boating, Sunset Views',
        location: 'Ranchi, Jharkhand',
        coordinates: { latitude: 23.3441, longitude: 85.3096 },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Ranchi Lake boating' },
            { url: 'https://picsum.photos/800/600', alt: 'Ranchi Lake sunset' },
            { url: 'https://picsum.photos/800/600', alt: 'Ranchi Lake view' }
        ],
        tags: ['nature', 'lake', 'picnic'],
        difficulty: 'easy',
        bestTime: 'Year-round',
        duration: '1-2 hours',
        entryFee: 'Free',
        facilities: ['boating', 'food', 'parking']
    },
    {
        title: 'Rock Garden Ranchi',
        description: 'Beautiful garden with rock formations, waterfalls, and landscaping.',
        history: 'Developed as a tourist attraction showcasing natural rock formations.',
        famousFor: 'Rock Formations, Gardens, Waterfalls',
        location: 'Ranchi, Jharkhand',
        coordinates: { latitude: 23.4131, longitude: 85.4394 },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Rock Garden formations' },
            { url: 'https://picsum.photos/800/600', alt: 'Rock Garden waterfall' },
            { url: 'https://picsum.photos/800/600', alt: 'Rock Garden landscaping' }
        ],
        tags: ['nature', 'family-friendly', 'photography'],
        difficulty: 'easy',
        bestTime: 'Year-round',
        duration: '2-3 hours',
        entryFee: '₹30',
        facilities: ['parking', 'food', 'restroom']
    },
    {
        title: 'Hirni Falls',
        description: 'Picturesque waterfall surrounded by dense forests, ideal for nature lovers.',
        history: 'Natural waterfall in a remote forest location.',
        famousFor: 'Waterfall, Nature, Trek',
        location: 'Ranchi, Jharkhand',
        coordinates: { latitude: 23.2500, longitude: 85.5833 },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Hirni Falls waterfall' },
            { url: 'https://picsum.photos/800/600', alt: 'Hirni Falls trek' },
            { url: 'https://picsum.photos/800/600', alt: 'Hirni Falls forest' }
        ],
        tags: ['waterfall', 'nature', 'trek'],
        difficulty: 'moderate',
        bestTime: 'August to February',
        duration: '1 day',
        entryFee: 'Free',
        facilities: ['none']
    },
    {
        title: 'Panch Gagh Falls',
        description: 'Five streams converging to form a spectacular waterfall in monsoon.',
        history: 'Natural formation where five streams meet.',
        famousFor: 'Unique Formation, Monsoon Beauty',
        location: 'Khunti, Jharkhand',
        coordinates: { latitude: 23.0667, longitude: 85.2833 },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Panch Gagh Falls five streams' },
            { url: 'https://picsum.photos/800/600', alt: 'Panch Gagh Falls monsoon' },
            { url: 'https://picsum.photos/800/600', alt: 'Panch Gagh Falls cascade' }
        ],
        tags: ['waterfall', 'nature', 'trek', 'offbeat'],
        difficulty: 'difficult',
        bestTime: 'July to October',
        duration: '1 day',
        entryFee: 'Free',
        facilities: ['none']
    },
    {
        title: 'Sita Falls',
        description: 'Beautiful waterfall with religious significance, named after Goddess Sita.',
        history: 'Local legends connect it to Ramayana era.',
        famousFor: 'Waterfall, Religious Site',
        location: 'Gumla, Jharkhand',
        coordinates: { latitude: 23.0167, longitude: 84.5500 },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Sita Falls waterfall' },
            { url: 'https://picsum.photos/800/600', alt: 'Sita Falls natural beauty' },
            { url: 'https://picsum.photos/800/600', alt: 'Sita Falls religious site' }
        ],
        tags: ['waterfall', 'religious', 'nature'],
        difficulty: 'moderate',
        bestTime: 'August to March',
        duration: '1 day',
        entryFee: 'Free',
        facilities: ['parking']
    },
    {
        title: 'Usri Falls',
        description: 'Year-round waterfall in Giridih district, popular among locals.',
        history: 'Natural waterfall formation in forested area.',
        famousFor: 'Waterfall, Picnic',
        location: 'Giridih, Jharkhand',
        coordinates: { latitude: 24.0833, longitude: 86.2667 },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Usri Falls year-round view' },
            { url: 'https://picsum.photos/800/600', alt: 'Usri Falls picnic spot' },
            { url: 'https://picsum.photos/800/600', alt: 'Usri Falls surroundings' }
        ],
        tags: ['waterfall', 'nature', 'picnic'],
        difficulty: 'easy',
        bestTime: 'Year-round',
        duration: '3-4 hours',
        entryFee: 'Free',
        facilities: ['parking', 'food']
    },
    {
        title: 'Getalsud Dam',
        description: 'Large reservoir with boating facilities and scenic surroundings.',
        history: 'Built for irrigation and water supply.',
        famousFor: 'Boating, Scenic Views',
        location: 'Ranchi, Jharkhand',
        coordinates: { latitude: 23.3167, longitude: 85.6000 },
        images: [
            { url: 'https://picsum.photos/800/600', alt: 'Getalsud Dam reservoir' },
            { url: 'https://picsum.photos/800/600', alt: 'Getalsud Dam boating' },
            { url: 'https://picsum.photos/800/600', alt: 'Getalsud Dam scenic view' }
        ],
        tags: ['nature', 'dam', 'boating'],
        difficulty: 'easy',
        bestTime: 'October to March',
        duration: '2-3 hours',
        entryFee: 'Free',
        facilities: ['boating', 'parking', 'food']
    }
];

const seedDestinations = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Find an admin user or create one
        let admin = await User.findOne({ role: 'admin' });
        if (!admin) {
            admin = await User.findOne({}); // Fallback to any user if no admin
            if (!admin) {
                console.log('No users found. Please create a user first.');
                process.exit(1);
            }
        }

        console.log(`Using user: ${admin.name} (${admin._id})`);

        for (const dest of destinations) {
            await Destination.findOneAndUpdate(
                { title: dest.title },
                { ...dest, createdBy: admin._id },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
            console.log(`Processed: ${dest.title}`);
        }

        console.log('Seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding destinations:', error);
        process.exit(1);
    }
};

seedDestinations();
