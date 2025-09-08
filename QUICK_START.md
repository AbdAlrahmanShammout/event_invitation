# 🚀 Quick Start Guide

Get your WhatsApp Invitation Platform running in minutes!

## ⚡ Prerequisites

- **Node.js** (v18 or higher)
- **PostgreSQL** (running locally or remotely)
- **npm** or **yarn**

## 🚀 One-Command Setup

```bash
# Make the startup script executable and run it
chmod +x start.sh && ./start.sh
```

This script will:
- ✅ Check if PostgreSQL is running
- 📦 Install all dependencies
- 🔧 Start the backend server
- 🎨 Start the frontend server
- 📱 Open the application

## 🔧 Manual Setup

### 1. Database Setup

```bash
# Create database
createdb whatsapp_invitations

# Run the setup script
psql -d whatsapp_invitations -f setup-database.sql
```

### 2. Backend Setup

```bash
cd backend_old_v2

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Edit .env with your database credentials
# DB_PASSWORD=your_actual_password
# JWT_SECRET=your_super_secret_key

# Start the server
npm run start:dev
```

### 3. Frontend Setup

```bash
cd frontend_old

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🌐 Access Points

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api

## 📱 First WhatsApp Setup

1. **Start the backend** - it will generate a QR code in the logs
2. **Scan the QR code** with your WhatsApp mobile app
3. **Authenticate** - your session will be saved for future use

## 🧪 Test Account

Use this test account to log in:
- **Email**: admin@example.com
- **Password**: password123

## 🚨 Common Issues

### PostgreSQL Connection Error
```bash
# Start PostgreSQL (macOS)
brew services start postgresql

# Start PostgreSQL (Ubuntu)
sudo systemctl start postgresql
```

### Port Already in Use
```bash
# Kill processes on ports 3000 and 3001
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

### WhatsApp QR Code Not Appearing
- Check the backend logs for errors
- Ensure Puppeteer is properly installed
- Try running in non-headless mode for debugging

## 📚 Next Steps

1. **Customize**: Update the `.env` file with your settings
2. **Test**: Send a test message to verify WhatsApp integration
3. **Deploy**: Consider deploying to production with proper security
4. **Monitor**: Check the logs and message statistics

## 🆘 Need Help?

- 📖 Check the full README.md
- 🐛 Look at the troubleshooting section
- 💬 Create an issue in the repository
- 📧 Check the API documentation at `/api`

---

**Happy Inviting! 🎉** 