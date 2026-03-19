#!/bin/bash

# Run backend and frontend concurrently.
# Usage: ./run.sh
# Press Ctrl+C to stop both.

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

cleanup() {
	echo ""
	echo "Stopping services..."
	kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
	exit 0
}

trap cleanup SIGINT SIGTERM

echo "Starting backend..."
cd "$BACKEND_DIR"
npm run dev &
BACKEND_PID=$!

echo "Starting frontend..."
cd "$FRONTEND_DIR"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "Backend (PID $BACKEND_PID) and frontend (PID $FRONTEND_PID) are running."
echo "Press Ctrl+C to stop both."
echo ""

wait
