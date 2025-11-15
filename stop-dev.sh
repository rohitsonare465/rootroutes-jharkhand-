#!/bin/bash

# RootRoutes Jharkhand - Stop Development Environment

echo "Stopping RootRoutes Jharkhand Development Environment..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

# Kill processes on ports
echo "Stopping backend (port 5001)..."
lsof -ti:5001 | xargs kill -9 2>/dev/null
pkill -f "node.*server.js" 2>/dev/null

echo "Stopping frontend (port 5173)..."
lsof -ti:5173 | xargs kill -9 2>/dev/null
pkill -f "vite" 2>/dev/null

# Clean up log files
rm -f backend.log frontend.log 2>/dev/null

echo -e "${GREEN}All services stopped${NC}"
