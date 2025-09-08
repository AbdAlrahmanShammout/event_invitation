# WhatsApp Invitation Platform

A full-stack web platform for sending WhatsApp invitations to events and parties. Built with NestJS (backend) and React (frontend).

## 🚀 Features

### Hall User Functionality
- Register and log in via email and password
- Access a dashboard
- Enter or paste a list of phone numbers
- Write custom invitation messages
- Send WhatsApp messages to all numbers
- View message history and statistics

### Admin Functionality
- List all registered halls
- View messages sent by each hall
- Suspend/delete hall accounts
- Monitor platform usage

## 🏗️ Architecture

### Backend (NestJS)
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with Passport
- **WhatsApp Integration**: whatsapp-web.js with Puppeteer
- **API Documentation**: Swagger/OpenAPI

### Frontend (React)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: Custom CSS

## 📁 Project Structure

```
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── modules/        # Feature modules
│   │   │   ├── authentication/
│   │   │   ├── halls/
│   │   │   ├── messages/
│   │   │   └── recipients/
│   │   ├── providers/      # External services
│   │   │   ├── whatsapp/
│   │   │   ├── logger/
│   │   │   └── database/
│   │   ├── common/         # Shared utilities
│   │   └── config/         # Configuration
│   └── database/           # Database files
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── contexts/       # React contexts
│   │   └── types/          # TypeScript types
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend_old_v2
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   - Copy `env.example` to `.env`
   - Update database and JWT configuration

4. **Database Setup**:
   - Create PostgreSQL database
   - Update `.env` with database credentials

5. **Start the backend**:
   ```bash
   npm run start:dev
   ```

   The backend will run on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend_old
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the frontend**:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3001`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=whatsapp_invitations

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h

# WhatsApp Configuration
WHATSAPP_SESSION_PATH=./whatsapp-sessions
WHATSAPP_CLIENT_ID=whatsapp-client

# Application Configuration
PORT=3000
NODE_ENV=development
```

## 📱 WhatsApp Setup

1. **First Run**: The backend will generate a QR code
2. **Scan QR Code**: Use WhatsApp on your phone to scan the QR code
3. **Authentication**: Once authenticated, the session will be saved
4. **Subsequent Runs**: The session will be reused automatically

## 🚀 API Endpoints

### Authentication
- `POST /auth/login` - Hall login
- `POST /auth/register` - Hall registration
- `GET /auth/profile` - Get hall profile

### Messages
- `POST /messages/send` - Send WhatsApp message
- `GET /messages` - Get message history
- `GET /messages/:id` - Get specific message
- `GET /messages/stats` - Get message statistics

### Halls (Admin)
- `GET /halls` - List all halls
- `GET /halls/:id` - Get hall details
- `PUT /halls/:id/status` - Update hall status
- `DELETE /halls/:id` - Delete hall

## 🧪 Testing

### Backend Tests
```bash
cd backend_old_v2
npm run test
```

### Frontend Tests
```bash
cd frontend_old
npm run test
```

## 📚 API Documentation

Once the backend is running, visit:
- **Swagger UI**: `http://localhost:3000/api`
- **API JSON**: `http://localhost:3000/api-json`

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation with class-validator
- CORS configuration
- Rate limiting (configurable)

## 🚨 Troubleshooting

### Common Issues

1. **WhatsApp QR Code Not Appearing**:
   - Check Puppeteer installation
   - Ensure headless mode is properly configured

2. **Database Connection Issues**:
   - Verify PostgreSQL is running
   - Check database credentials in `.env`

3. **Frontend Build Issues**:
   - Clear node_modules and reinstall
   - Check TypeScript configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation
- Review the troubleshooting section 