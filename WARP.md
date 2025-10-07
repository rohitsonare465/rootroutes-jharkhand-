# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

RootRoutes Jharkhand is a full-stack web platform for eco & cultural tourism destinations in Jharkhand, India. It features a React frontend with Vite, Express.js backend with MongoDB, and comprehensive Docker containerization.

## Development Commands

### Root-level Commands
```bash
# Install all dependencies (frontend + backend)
npm run install-deps

# Start development servers concurrently
npm run dev                # Starts both frontend (localhost:5173) and backend (localhost:5000)

# Individual development servers
npm run server             # Backend only
npm run client             # Frontend only

# Database seeding
npm run seed               # Seeds database with sample data and admin user

# Testing
npm run test               # Runs backend Jest tests

# Production builds
npm run build              # Builds frontend for production
npm start                  # Starts production backend server
```

### Backend-specific Commands (in backend/ directory)
```bash
cd backend

# Development
npm run dev                # Starts with nodemon for auto-reload

# Testing
npm test                   # Runs Jest test suite
npm test -- --watch       # Runs tests in watch mode

# Database operations
npm run seed               # Seeds database with sample destinations and admin user
```

### Frontend-specific Commands (in frontend/ directory)
```bash
cd frontend

# Development
npm run dev                # Starts Vite dev server (localhost:5173)

# Production
npm run build              # Builds optimized production bundle
npm run preview            # Preview production build

# Code quality
npm run lint               # ESLint check
```

### Docker Commands
```bash
# Development with Docker
docker-compose up --build  # Builds and starts all services (frontend:3000, backend:5001, MongoDB:27017)
docker-compose down        # Stops all services

# Individual services
docker-compose up mongodb  # Start only MongoDB
docker-compose up backend  # Start backend + dependencies
```

## High-Level Architecture

### Monorepo Structure
This is a monorepo with separate frontend and backend applications that can be developed and deployed independently or together.

### Backend Architecture (Node.js/Express)
- **MVC Pattern**: Controllers handle business logic, models define data schemas, routes define endpoints
- **Authentication**: JWT-based auth with bcryptjs password hashing
- **Authorization**: Role-based access control (user/admin roles)
- **Database**: MongoDB with Mongoose ODM, including text search indexes
- **Middleware**: Custom auth middleware, CORS, Express built-ins
- **Error Handling**: Centralized error handling with environment-aware messages

### Frontend Architecture (React)
- **Context API**: AuthContext provides global authentication state management
- **Service Layer**: Centralized API calls in services/api.js with axios interceptors
- **Protected Routes**: ProtectedRoute component wraps authenticated pages
- **Token Management**: Automatic token injection and 401 handling
- **Environment Configuration**: Vite-based environment variables

### Key Data Models

#### User Model
- JWT-based authentication with role-based access (user/admin)
- Password hashing with bcryptjs
- Email validation and uniqueness constraints

#### Destination Model
- Rich content model with images, coordinates, tags, and ratings
- Text search indexing on title, description, and location
- Status-based content moderation (active/pending/inactive)
- Predefined enums for tags, difficulty, and facilities
- User ownership tracking with population support

### API Architecture
- RESTful design with consistent JSON responses
- Pagination support with metadata
- Advanced filtering by search, tags, and difficulty
- Full CRUD operations with proper authorization
- Comprehensive error handling and validation

### Authentication Flow
1. Frontend stores JWT token in localStorage
2. Axios interceptors automatically attach tokens to requests
3. Backend middleware validates tokens and attaches user to request
4. Automatic logout on token expiration (401 responses)

### Database Indexing Strategy
- Text search index on title, description, location for search functionality
- Performance indexes on tags, location, and rating.average
- Efficient querying for filtered and sorted destination lists

### Environment Configuration
The application requires proper environment setup:

**Backend (.env)**:
- `MONGODB_URI`: Database connection string
- `JWT_SECRET`: Secret key for JWT signing
- `NODE_ENV`: Environment mode (development/production)
- `PORT`: Server port (default 5000)
- `FRONTEND_URL`: Frontend URL for CORS

**Frontend (.env)**:
- `VITE_API_URL`: Backend API base URL

### Testing Strategy
- Backend: Jest + Supertest for API integration tests
- Tests cover authentication, CRUD operations, and error scenarios
- Database seeding for consistent test data
- Authentication token management in test setup

### Docker Architecture
- Multi-service setup with MongoDB, backend, and frontend
- Development-oriented configuration with volume mounting
- Service dependencies properly configured
- Environment variable passing between services

### Default Admin Access
After running `npm run seed`:
- Email: admin@rootroutes.com
- Password: admin123

## Development Notes

### Database Seeding
The seed script creates sample destinations and an admin user. Run `npm run seed` after setting up your environment to populate the database with test data.

### API Response Format
All API responses follow a consistent structure:
```json
{
  "status": "success|error",
  "data": { ... },           // On success
  "message": "...",          // On error or info
  "pagination": { ... }      // For paginated endpoints
}
```

### Authentication Patterns
- Use the AuthContext hook: `const { user, isAuthenticated, login, logout } = useAuth()`
- Wrap protected components with `<ProtectedRoute>`
- API calls automatically include authentication headers when tokens are present

### Search and Filtering
Destinations API supports:
- Text search: `GET /api/destinations?search=waterfall`
- Tag filtering: `GET /api/destinations?tags=nature,trek`
- Difficulty filtering: `GET /api/destinations?difficulty=moderate`
- Pagination: `GET /api/destinations?page=2&limit=20`

### Error Handling Best Practices
- Backend returns appropriate HTTP status codes
- Frontend axios interceptors handle common scenarios (401, network errors)
- Validation errors provide detailed field-specific messages
- Production environment hides sensitive error details