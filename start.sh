#!/usr/bin/env bash

# ==============================================================================
# Prophesee AI / Metavision Technologies - Project Launcher
# ==============================================================================

set -e

# Change directory to the root of the project
cd "$(dirname "$0")"

# Colors for terminal output
CYAN='\033[0;36m'
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================================================${NC}"
echo -e "${CYAN}     PROPHESEE | Metavision Technologies (Web Project)${NC}"
echo -e "${BLUE}================================================================${NC}"

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}[ERROR] Node.js is not installed or not in PATH.${NC}"
    echo -e "Please install Node.js (v18+) from https://nodejs.org/"
    exit 1
fi

# Check for npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}[ERROR] npm is not installed or not in PATH.${NC}"
    exit 1
fi

NODE_VERSION=$(node -v)
NPM_VERSION=$(npm -v)
echo -e "${GREEN}✓ Node.js detected:${NC} $NODE_VERSION"
echo -e "${GREEN}✓ npm detected:${NC} $NPM_VERSION"

# Install dependencies if node_modules does not exist
if [ ! -d "node_modules" ]; then
    echo -e "\n${YELLOW}node_modules not found. Installing dependencies...${NC}"
    npm install
fi

# Automatically free port 3000 if occupied by a previous session
PORT=3000
OCCUPIED_PID=$(lsof -ti :$PORT 2>/dev/null || true)
if [ -n "$OCCUPIED_PID" ]; then
    echo -e "\n${YELLOW}[!] Freeing port $PORT from previous process (PID $OCCUPIED_PID)...${NC}"
    kill -9 $OCCUPIED_PID 2>/dev/null || true
    sleep 0.5
fi

# Fallback to 5173 if 3000 is still held
if lsof -ti :$PORT &>/dev/null; then
    PORT=5173
fi

echo -e "\n${CYAN}Starting local server...${NC}"
echo -e "${GREEN}➜ Access the site at: ${CYAN}http://localhost:$PORT/${NC}"
echo -e "Press ${YELLOW}Ctrl + C${NC} to stop the server.\n"

# Run Vite development server with auto-open browser
npm run dev -- --host 127.0.0.1 --port $PORT --open
