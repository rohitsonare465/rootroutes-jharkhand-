#!/bin/bash

# RootRoutes Jharkhand - Development Startup Script
# This script ensures clean startup of both backend and frontend

echo "Starting RootRoutes Jharkhand Development Environment..."
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if port is in use
check_port() {
    lsof -ti:$1 > /dev/null 2>&1
    return $?
}

# Function to kill process on port
kill_port() {
    if check_port $1; then
        echo -e "${YELLOW}WARNING: Port $1 is in use. Killing process...${NC}"
        lsof -ti:$1 | xargs kill -9 2>/dev/null
        sleep 1
        if check_port $1; then
            echo -e "${RED}ERROR: Failed to free port $1${NC}"
            return 1
        else
            echo -e "${GREEN}SUCCESS: Port $1 freed${NC}"
        fi
    else
        echo -e "${GREEN}SUCCESS: Port $1 is available${NC}"
    fi
    return 0
}

# Check MongoDB
echo "Checking MongoDB..."
if pgrep -x mongod > /dev/null; then
    echo -e "${GREEN}SUCCESS: MongoDB is running${NC}"
else
    echo -e "${RED}ERROR: MongoDB is not running${NC}"
    echo "   Starting MongoDB..."
    brew services start mongodb-community 2>/dev/null || mongod --config /usr/local/etc/mongod.conf --fork 2>/dev/null
    sleep 2
fi

echo ""
echo "Checking ports..."

# Check and free backend port (5001)
kill_port 5001

# Check and free frontend port (5173)
kill_port 5173

echo ""
echo "Starting Backend..."
PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_ROOT/backend"
if [ -f "server.js" ]; then
    # Kill any existing node processes for this project
    pkill -f "node.*server.js" 2>/dev/null
    sleep 1
    
    # Start backend in background
    npm start > ../backend.log 2>&1 &
    BACKEND_PID=$!
    echo "   Backend starting (PID: $BACKEND_PID)..."
    
    # Wait for backend to be ready
    for i in {1..10}; do
        sleep 1
        if curl -s http://localhost:5001/api/health > /dev/null 2>&1; then
            echo -e "${GREEN}SUCCESS: Backend is ready on http://localhost:5001${NC}"
            break
        fi
        if [ $i -eq 10 ]; then
            echo -e "${RED}ERROR: Backend failed to start. Check backend.log for details.${NC}"
        fi
    done
else
    echo -e "${RED}ERROR: Backend server.js not found${NC}"
fi

echo ""
echo "Starting Frontend..."
cd "$PROJECT_ROOT/frontend"
if [ -f "package.json" ]; then
    # Start frontend in background
    npm run dev > ../frontend.log 2>&1 &
    FRONTEND_PID=$!
    echo "   Frontend starting (PID: $FRONTEND_PID)..."
    
    # Wait for frontend to be ready
    for i in {1..10}; do
        sleep 1
        if curl -s http://localhost:5173 > /dev/null 2>&1; then
            echo -e "${GREEN}SUCCESS: Frontend is ready on http://localhost:5173${NC}"
            break
        fi
        if [ $i -eq 10 ]; then
            echo -e "${RED}ERROR: Frontend failed to start. Check frontend.log for details.${NC}"
        fi
    done
else
    echo -e "${RED}ERROR: Frontend package.json not found${NC}"
fi

echo ""
echo "=========================================="
echo -e "${GREEN}Development environment is ready!${NC}"
echo ""
echo "Frontend:  http://localhost:5173"
echo "Backend:   http://localhost:5001"
echo "Health:    http://localhost:5001/api/health"
echo ""
echo "Logs:"
echo "   Backend:  tail -f backend.log"
echo "   Frontend: tail -f frontend.log"
echo ""
echo "To stop all services:"
echo "   ./stop-dev.sh"
echo "=========================================="
