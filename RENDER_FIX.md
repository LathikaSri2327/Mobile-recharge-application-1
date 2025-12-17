# Render Deployment Fix

## Issue
Render is trying to deploy the frontend instead of backend, causing "react-scripts not found" error.

## Solution

### For Backend Deployment:

1. **In Render Dashboard:**
   - Service Type: Web Service
   - **Root Directory: `backend`** (IMPORTANT)
   - Build Command: `npm install`
   - Start Command: `npm start`

2. **Environment Variables:**
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/mobile-recharge
   JWT_SECRET=your-secure-jwt-secret
   PORT=10000
   ```

### For Frontend Deployment (Separate Service):

1. **Create New Static Site on Render:**
   - Root Directory: `.` (root)
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`

2. **Environment Variables:**
   ```
   REACT_APP_API_URL=https://mobile-recharge-backend.onrender.com/api
   ```

## Alternative: Use Netlify for Frontend

1. **Deploy Frontend to Netlify:**
   - Connect GitHub repo
   - Build command: `npm run build`
   - Publish directory: `build`
   - Environment: `REACT_APP_API_URL=https://your-backend.onrender.com/api`

## Key Points:
- ✅ Backend goes to Render Web Service with `backend` root directory
- ✅ Frontend goes to Render Static Site OR Netlify
- ✅ Never deploy both together on same service