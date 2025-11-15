# RootRoutes Jharkhand

**Discover the hidden gems of Jharkhand** - A full-stack web platform dedicated to eco & cultural tourism destinations in the beautiful state of Jharkhand, India.

## Features

- **Destination Discovery** - Explore waterfalls, temples, national parks, and cultural sites
- **Advanced Search** - Filter by tags, difficulty, location, and more
- **User Authentication** - Secure registration and login system with JWT
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Cultural Focus** - Dedicated sections for tribal heritage and traditions
- **Eco Tourism** - Nature-focused destinations and conservation awareness
- **Rating System** - Community-driven destination ratings
- **Interactive Maps** - Google Maps integration for easy navigation
- **Modern UI** - Built with Tailwind CSS and Framer Motion

## Tech Stack

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

## Quick Start

### One-Command Startup (Recommended)
```bash
# Start both backend and frontend
./start-dev.sh

# Stop all services
./stop-dev.sh
```

### Manual Setup

#### Prerequisites
- Node.js 18+ installed
- MongoDB installed and running
- Git

#### Installation
```bash
git clone <repository-url>
cd rootroutes-jharkhand-

# Install backend dependencies
cd backend && npm install && cd ..

# Install frontend dependencies
cd frontend && npm install && cd ..
```

#### Environment Variables
Backend `.env` file is already configured for local development.

Frontend `.env` file:
```env
VITE_API_URL=http://localhost:5001/api
VITE_APP_NAME=RootRoutes Jharkhand
```

#### Start Services

Start MongoDB:
```bash
brew services start mongodb-community
```

Start Backend:
```bash
cd backend
npm start
# Backend runs on http://localhost:5001
```

Start Frontend:
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

#### Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5001/api
- Health Check: http://localhost:5001/api/health

## Docker Setup

```bash
# Build and start all services
docker compose up --build

# Stop all services
docker compose down

# View logs
docker compose logs -f backend
docker compose logs -f frontend
```

Access:
- Frontend: http://localhost
- Backend: http://localhost:5001/api

## Project Structure

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
├── start-dev.sh             # Development startup script
├── stop-dev.sh              # Development stop script
└── README.md                # This file
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Destinations Endpoints
- `GET /api/destinations` - Get all destinations with pagination and filters
- `GET /api/destinations/:id` - Get destination by ID
- `POST /api/destinations` - Create new destination (admin only)
- `PUT /api/destinations/:id` - Update destination (admin only)
- `DELETE /api/destinations/:id` - Delete destination (admin only)

### Example API Requests

Register User:
```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

Login:
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

Get Destinations:
```bash
curl http://localhost:5001/api/destinations
```

## Testing

```bash
# Run backend tests
cd backend && npm test

# Run tests in watch mode
cd backend && npm test -- --watch
```

## Production Build

Build Frontend:
```bash
cd frontend
npm run build
# Production files will be in frontend/dist/
```

Run Production Server:
```bash
cd backend
NODE_ENV=production npm start
```

## License

This project is licensed under the MIT License.

## Acknowledgments

- Tourism Department, Government of Jharkhand
- Local communities and cultural organizations
- Open source contributors

---

Made with dedication to promote Jharkhand's rich cultural and natural heritage.
