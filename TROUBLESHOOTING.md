# Mobile Recharge App - Troubleshooting Guide

## Fixed Issues

### Authentication (Login/Register) Not Working

**Problem**: Login and register functionality was failing due to missing backend configuration.

**Solutions Applied**:

1. **Added missing auth routes** to `backend/server.js`:
   ```javascript
   app.use('/api/auth', require('./routes/auth'));
   ```

2. **Added missing dependencies** to `backend/package.json`:
   - `bcryptjs` for password hashing
   - `jsonwebtoken` for JWT token generation

3. **Added JWT_SECRET** to `backend/.env` file for secure token generation

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   # Run the setup script
   setup.bat
   
   # Or manually:
   cd backend && npm install
   cd .. && npm install
   ```

2. **Start MongoDB**:
   - Ensure MongoDB is running on `mongodb://localhost:27017`

3. **Start Backend Server**:
   ```bash
   npm run start-backend
   # Server will run on http://localhost:5000
   ```

4. **Start Frontend**:
   ```bash
   npm start
   # App will run on http://localhost:3000
   ```

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/plans` - Get recharge plans
- `POST /api/recharge` - Process recharge

## Common Issues

### 1. "Cannot POST /api/auth/login"
- **Cause**: Backend server not running or auth routes not configured
- **Solution**: Ensure backend is running and auth routes are added to server.js

### 2. "Module not found: bcryptjs"
- **Cause**: Missing authentication dependencies
- **Solution**: Run `cd backend && npm install`

### 3. "MongoDB connection error"
- **Cause**: MongoDB not running
- **Solution**: Start MongoDB service

### 4. "Invalid credentials" on correct login
- **Cause**: User not registered or password hashing issue
- **Solution**: Try registering a new user first

## Environment Variables

Backend `.env` file should contain:
```
MONGODB_URI=mongodb://localhost:27017/mobile-recharge
PORT=5000
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```