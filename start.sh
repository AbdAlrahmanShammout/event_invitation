#!/bin/bash

echo "🚀 Starting WhatsApp Invitation Platform..."

# Check if PostgreSQL is running
echo "📊 Checking PostgreSQL..."
if ! pg_isready -q; then
    echo "❌ PostgreSQL is not running. Please start PostgreSQL first."
    echo "   On macOS: brew services start postgresql"
    echo "   On Ubuntu: sudo systemctl start postgresql"
    exit 1
fi
echo "✅ PostgreSQL is running"

# Start backend_old_v2
echo "🔧 Starting backend..."
cd backend_old_v2
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp env.example .env
    echo "📝 Please update .env with your database credentials and JWT secret"
fi

echo "📦 Installing backend dependencies..."
npm install

echo "🚀 Starting backend server..."
npm run start:dev &
BACKEND_PID=$!

# Wait for backend_old_v2 to start
echo "⏳ Waiting for backend to start..."
sleep 10

# Start frontend_old
echo "🎨 Starting frontend..."
cd ../frontend_old
echo "📦 Installing frontend dependencies..."
npm install

echo "🚀 Starting frontend server..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "🎉 WhatsApp Invitation Platform is starting up!"
echo ""
echo "📱 Backend: http://localhost:3000"
echo "🌐 Frontend: http://localhost:3001"
echo "📚 API Docs: http://localhost:3000/api"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user to stop
trap "echo ''; echo '🛑 Stopping services...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT

wait 