# 🌿 RootRoutes Jharkhand

**Discover the hidden gems of Jharkhand** - A full-stack web platform dedicated to eco & cultural tourism destinations in the beautiful state of Jharkhand, India.

![RootRoutes Banner](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop)

## ✨ Features

- 🏞️ **Destination Discovery** - Explore waterfalls, temples, national parks, and cultural sites
- 🔍 **Advanced Search** - Filter by tags, difficulty, location, and more
- 👤 **User Authentication** - Secure registration and login system
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🏛️ **Cultural Focus** - Dedicated sections for tribal heritage and traditions
- 🌊 **Eco Tourism** - Nature-focused destinations and conservation awareness
- ⭐ **Rating System** - Community-driven destination ratings
- 🗺️ **Interactive Maps** - Google Maps integration for easy navigation

## 🛠️ Tech Stack

### Frontend
- **React 18** with Hooks and Context API
- **Vite** for fast development and building
- **React Router DOM** for client-side routing
- **Axios** for API communication
- **Tailwind CSS** for styling (implied from components)

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

### DevOps & Deployment
- **Docker** with multi-stage builds
- **Docker Compose** for local development
- **Nginx** for frontend serving
- **Jest & Supertest** for testing

## 📁 Project Structure

```
rootroutes-jharkhand/
├── 📂 frontend/              # React frontend application
│   ├── 📂 src/
│   │   ├── 📂 components/    # Reusable UI components
│   │   ├── 📂 pages/         # Page components
│   │   ├── 📂 context/       # React Context providers
│   │   ├── 📂 services/      # API service functions
│   │   └── 📂 utils/         # Utility functions
│   ├── 📄 Dockerfile         # Frontend containerization
│   └── 📄 nginx.conf         # Nginx configuration
├── 📂 backend/               # Node.js/Express backend API
│   ├── 📂 config/           # Database configuration
│   ├── 📂 controllers/      # Route controllers
│   ├── 📂 middleware/       # Custom middleware
│   ├── 📂 models/           # Mongoose models
│   ├── 📂 routes/           # API routes
│   ├── 📂 scripts/          # Utility scripts (seed data)
│   ├── 📂 tests/            # Test files
│   └── 📄 Dockerfile        # Backend containerization
├── 📄 docker-compose.yml    # Local development setup
├── 📄 package.json          # Root package file with scripts
└── 📄 README.md             # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or cloud instance)
- **Git**

### Method 1: Local Development

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd rootroutes-jharkhand
   ```

2. **Install dependencies:**
   ```bash
   npm run install-deps
   ```

3. **Set up environment variables:**
   ```bash
   # Copy example env file
   cp backend/.env.example backend/.env
   
   # Update the .env file with your MongoDB connection string
   # Default local MongoDB: mongodb://localhost:27017/rootroutes_jharkhand
   ```

4. **Seed the database (optional):**
   ```bash
   npm run seed
   ```

5. **Start development servers:**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Method 2: Docker Development

1. **Clone and start with Docker:**
   ```bash
   git clone <repository-url>
   cd rootroutes-jharkhand
   docker-compose up --build
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

## 📱 Usage

### For Visitors
1. **Explore Destinations** - Browse through curated eco and cultural tourism spots
2. **Search & Filter** - Find destinations by keywords, tags, or difficulty level
3. **View Details** - Get comprehensive information including best visiting times, entry fees, and facilities
4. **Plan Visits** - Access Google Maps integration for easy navigation

### For Registered Users
1. **Create Profile** - Sign up to unlock additional features
2. **Rate Destinations** - Share your experience with the community
3. **Save Favorites** - Keep track of places you want to visit
4. **Contribute** - Add new destinations to help others discover hidden gems

### Default Admin Credentials
After running the seed script:
- **Email:** admin@rootroutes.com
- **Password:** admin123

## 🧪 Testing

```bash
# Run backend tests
npm run test

# Run tests in watch mode
cd backend && npm run test -- --watch
```

## 🛠️ API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Destinations Endpoints
- `GET /api/destinations` - Get all destinations with pagination and filters
- `GET /api/destinations/:id` - Get destination by ID
- `POST /api/destinations` - Create new destination (protected)
- `PUT /api/destinations/:id` - Update destination (protected)
- `DELETE /api/destinations/:id` - Delete destination (protected)

### Query Parameters for Destinations
- `search` - Search in title, description, and location
- `tags` - Filter by comma-separated tags
- `difficulty` - Filter by difficulty level (easy, moderate, difficult)
- `page` - Page number for pagination
- `limit` - Number of results per page

### Health Check
- `GET /api/health` - API health status

## 🏗️ Deployment

### Docker Production Deployment

1. **Set environment variables:**
   ```bash
   export JWT_SECRET="your-super-secret-production-key"
   ```

2. **Deploy with Docker Compose:**
   ```bash
   docker-compose -f docker-compose.yml up -d
   ```

### Cloud Deployment Options

#### Option 1: Railway
1. Fork this repository
2. Connect to Railway
3. Deploy backend and frontend as separate services
4. Set environment variables in Railway dashboard

#### Option 2: Render
1. **Backend**: Deploy as Web Service
2. **Frontend**: Deploy as Static Site
3. **Database**: Use MongoDB Atlas or Render's MongoDB addon

#### Option 3: Fly.io
1. Install Fly CLI
2. Run `fly launch` in backend and frontend directories
3. Configure environment variables
4. Deploy with `fly deploy`

### Environment Variables for Production

**Backend (.env):**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secure-secret-key
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-domain.com
```

**Frontend (.env):**
```env
VITE_API_URL=https://your-backend-domain.com/api
```

## 🗃️ Database Schema

### User Model
- `name`: String (required)
- `email`: String (required, unique)
- `password`: String (hashed, required)
- `role`: String (user/admin, default: user)
- `avatar`: String (optional)
- `createdAt`: Date

### Destination Model
- `title`: String (required)
- `description`: String (required)
- `location`: String (required)
- `coordinates`: Object (latitude, longitude)
- `images`: Array of Objects (url, alt)
- `tags`: Array of Strings
- `difficulty`: String (easy/moderate/difficult)
- `bestTime`: String
- `duration`: String
- `entryFee`: String
- `facilities`: Array of Strings
- `rating`: Object (average, count)
- `createdBy`: ObjectId (User reference)
- `status`: String (active/pending/inactive)
- `createdAt`: Date

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Jharkhand Tourism Board** for destination information
- **Local communities** for cultural insights
- **Unsplash** for placeholder images
- **MongoDB Atlas** for database hosting
- **Vercel/Netlify** for deployment options

## 📞 Support

For support, please reach out through:
- 📧 Email: support@rootroutes.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-repo/discussions)

---

**Made with ❤️ for Jharkhand Tourism** | Discover • Explore • Preserve
