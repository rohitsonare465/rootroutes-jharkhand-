# 🌿 RootRoutes Jharkhand

**Discover the hidden gems of Jharkhand** - A full-stack web platform dedicated to eco & cultural tourism destinations in the beautiful state of Jharkhand, India.

## ✨ Features

- 🏞️ **Destination Discovery** - Explore waterfalls, temples, national parks, and cultural sites
- 🔍 **Advanced Search** - Filter by tags, difficulty, location, and more
- 👤 **User Authentication** - Secure registration and login system with JWT
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🏛️ **Cultural Focus** - Dedicated sections for tribal heritage and traditions
- 🌊 **Eco Tourism** - Nature-focused destinations and conservation awareness
- ⭐ **Rating System** - Community-driven destination ratings
- 🗺️ **Interactive Maps** - Google Maps integration for easy navigation
- 🎨 **Modern UI** - Built with Tailwind CSS and Framer Motion

## 🛠️ Tech Stack

### Frontend
- **React 19** with Hooks and Context API
- **Vite 6** for fast development and building
- **React Router DOM 7** for client-side routing
- **Axios** for API communication
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests
- **dotenv** for environment management

### DevOps & Tools
- **Docker** with Docker Compose
- **Nginx** for production frontend serving
- **Jest & Supertest** for testing
- **ESLint** for code quality

## 📁 Project Structure

```
rootroutes-jharkhand/
├── backend/                  # Express.js API
│   ├── config/              # Database configuration
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Authentication middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── scripts/             # Database seeding scripts
│   └── tests/               # API tests
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React Context providers
│   │   └── services/        # API service functions
│   ├── Dockerfile           # Frontend containerization
│   └── nginx.conf           # Nginx configuration
├── docker-compose.yml       # Multi-container setup
├── package.json             # Root scripts
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

### Local Development

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd rootroutes-jharkhand
   ```

2. **Install dependencies:**
   ```bash
   # Install all dependencies (root, backend, and frontend)
   npm run install-deps
   ```

3. **Set up environment variables:**
   
   **Backend** (`backend/.env`):
   ```env
   MONGODB_URI=mongodb://localhost:27017/rootroutes_jharkhand
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   JWT_EXPIRE=7d
   PORT=5001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```
   
   **Frontend** (`frontend/.env`):
   ```env
   VITE_API_URL=http://localhost:5001/api
   VITE_APP_NAME=RootRoutes Jharkhand
   ```

4. **Start MongoDB:**
   ```bash
   # macOS with Homebrew
   brew services start mongodb-community
   
   # or manually
   mongod
   ```

5. **Seed the database (optional):**
   ```bash
   npm run seed
   ```

6. **Start the development servers:**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # OR start them individually:
   # Backend: npm run server
   # Frontend: npm run client
   ```

7. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001/api
   - API Health: http://localhost:5001/api/health

### Docker Development

```bash
# Start all services with Docker
docker-compose up --build

# Access:
# - Frontend: http://localhost:3000
# - Backend: http://localhost:5000
# - MongoDB: localhost:27017
```

## 📝 Available Scripts

### Root Level
```bash
npm run dev          # Start both frontend and backend
npm run server       # Start backend only
npm run client       # Start frontend only
npm run build        # Build frontend for production
npm run install-deps # Install all dependencies
npm run seed         # Seed database with sample data
npm test            # Run backend tests
```

### Backend
```bash
cd backend
npm start           # Start production server
npm run dev         # Start development server with nodemon
npm test            # Run Jest tests
npm run seed        # Seed database
```

### Frontend
```bash
cd frontend
npm run dev         # Start Vite dev server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

## � API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)

### Destinations
- `GET /api/destinations` - Get all destinations (with filters)
- `GET /api/destinations/:id` - Get single destination
- `POST /api/destinations` - Create destination (Protected)
- `PUT /api/destinations/:id` - Update destination (Protected)
- `DELETE /api/destinations/:id` - Delete destination (Protected)

### Query Parameters for Destinations
- `search` - Search by title, description, or location
- `tags` - Filter by tags (comma-separated)
- `difficulty` - Filter by difficulty (easy, moderate, difficult)
- `page` - Page number for pagination
- `limit` - Results per page

### Health
- `GET /api/health` - API health check

## 🧪 Testing

### Run Tests
```bash
cd backend
npm test
```

### Test Coverage
- User authentication (registration, login, profile)
- Destination CRUD operations
- Protected routes
- Error handling
- API health checks

## 🌐 Environment Variables

### Backend (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/rootroutes_jharkhand` |
| `JWT_SECRET` | Secret key for JWT tokens | Required |
| `JWT_EXPIRE` | JWT token expiration | `7d` |
| `PORT` | Backend server port | `5001` |
| `NODE_ENV` | Environment mode | `development` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |

### Frontend (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5001/api` |
| `VITE_APP_NAME` | Application name | `RootRoutes Jharkhand` |

## 📦 Database Models

### User Model
- `name` - User's full name
- `email` - Unique email address
- `password` - Hashed password
- `role` - User role (user, admin)
- `avatar` - Profile picture URL
- `createdAt` - Account creation timestamp

### Destination Model
- `title` - Destination name
- `description` - Detailed description
- `location` - Location address
- `coordinates` - Lat/Long for maps
- `images` - Array of image URLs
- `tags` - Category tags
- `difficulty` - Difficulty level
- `bestTime` - Best time to visit
- `duration` - Recommended duration
- `entryFee` - Entry fee information
- `facilities` - Available facilities
- `rating` - Average rating and count
- `createdBy` - User who created it
- `status` - Active/Pending/Inactive

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token-based authentication
- ✅ Protected API routes
- ✅ CORS configuration
- ✅ Input validation with Mongoose
- ✅ Secure HTTP headers
- ✅ Environment variable management

## 🚢 Deployment

### Production Build

1. **Build frontend:**
   ```bash
   npm run build
   ```

2. **Set environment to production:**
   ```bash
   export NODE_ENV=production
   ```

3. **Use production MongoDB:**
   Update `MONGODB_URI` in backend/.env

4. **Deploy with Docker:**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- RootRoutes Team

## 🙏 Acknowledgments

- Images from Unsplash
- Icons from Lucide React
- Community contributors

## 📧 Support

For issues and questions:
- Create an issue on GitHub
- Contact the development team

---

**Made with ❤️ for Jharkhand Tourism**
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
