# Mobile Recharge App

A full-stack mobile recharge application built with React.js and Node.js.

## 🚀 Live Demo

- **Frontend**: [Deploy on Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/mobile-recharge-app)
- **Backend**: [Deploy on Render](https://render.com)

## 📋 Features

- User Authentication (Login/Register)
- Mobile Recharge Plans
- Bill Payments
- Wallet Management
- Admin Dashboard
- Agent Portal
- Transaction History

## 🛠️ Tech Stack

**Frontend:**
- React.js
- React Router
- Axios
- React Toastify

**Backend:**
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcryptjs

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB
- Git

### Local Development

1. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/mobile-recharge-app.git
   cd mobile-recharge-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Update .env with your MongoDB URI
   npm start
   ```

3. **Frontend Setup**
   ```bash
   # In new terminal
   npm install
   npm start
   ```

## 🌐 Deployment

### Backend (Render)
1. Connect GitHub repository to Render
2. Set root directory to `backend`
3. Add environment variables:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret
   ```

### Frontend (Netlify)
1. Connect GitHub repository to Netlify
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
3. Environment variables:
   ```
   REACT_APP_API_URL=https://your-backend.onrender.com/api
   ```

## 📁 Project Structure

```
mobile-recharge-app/
├── backend/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── server.js          # Entry point
├── src/                   # React frontend
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   └── utils/            # Utility functions
└── public/               # Static assets
```

## 🔧 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/mobile-recharge
PORT=5002
JWT_SECRET=your-secret-key
```

### Frontend (.env.production)
```
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

## 📝 API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/plans` - Get recharge plans
- `POST /api/recharge` - Process recharge
- `GET /api/wallet/balance` - Get wallet balance

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@example.com or create an issue on GitHub.