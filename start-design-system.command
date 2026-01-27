#!/bin/bash
# Start Design System Dev Server
# Double-click this file to start the dev server and open the design system in Chrome

PROJECT_DIR="/Users/Matt_Weaver-Yuwono/Library/CloudStorage/OneDrive-McKinsey&Company/Documents/Projects/m3-design-v2"
PORT=5173
URL="http://localhost:${PORT}/design-system.html"

# Change to project directory
cd "$PROJECT_DIR" || {
    echo "Error: Could not change to project directory: $PROJECT_DIR"
    echo "Press any key to exit..."
    read -n 1
    exit 1
}

# Function to kill process on port
kill_port() {
    local pid=$(lsof -ti:${PORT} 2>/dev/null)
    if [ -n "$pid" ]; then
        echo "Stopping existing dev server (PID: $pid)..."
        kill -9 "$pid" 2>/dev/null
        sleep 1
        echo "Existing server stopped."
    else
        echo "No existing dev server found."
    fi
}

# Kill any existing server
echo "=========================================="
echo "Design System Dev Server Launcher"
echo "=========================================="
echo ""
kill_port

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed or not in PATH"
    echo "Press any key to exit..."
    read -n 1
    exit 1
fi

# Start dev server in background
echo "Starting dev server..."
npm run dev &
SERVER_PID=$!

# Wait for server to be ready
echo "Waiting for server to start..."
MAX_WAIT=30
WAITED=0
while [ $WAITED -lt $MAX_WAIT ]; do
    if curl -s http://localhost:${PORT} > /dev/null 2>&1; then
        echo "✓ Server is ready!"
        break
    fi
    sleep 1
    WAITED=$((WAITED + 1))
    echo -n "."
done
echo ""

if [ $WAITED -ge $MAX_WAIT ]; then
    echo "Warning: Server may not be ready yet, but opening browser anyway..."
fi

# Open browser
echo "Opening design system in Chrome..."
if ! open -a "Google Chrome" "$URL" 2>/dev/null; then
    echo "Warning: Could not open Chrome. Please open manually: $URL"
fi

# Keep terminal open and show server output
echo ""
echo "=========================================="
echo "Dev server running (PID: $SERVER_PID)"
echo "Design System: $URL"
echo "Press Ctrl+C to stop the server"
echo "=========================================="
echo ""

# Wait for the server process
wait $SERVER_PID
