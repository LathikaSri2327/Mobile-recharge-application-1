# Deployment Guide - Mobile Recharge App

## Backend Deployment (Render)

### 1. Create Render Account
- Go to [render.com](https://render.com)
- Sign up with GitHub

### 2. Deploy Backend
1. **Create Web Service**
   - Connect GitHub repository
   - Select `backend` folder as root directory
   - Build Command: `npm install`
   - Start Command: `npm start`

2. **Environment Variables**
   ```
   NODE_ENV=production
   MONGODB_URI=<your-mongodb-atlas-uri>
   JWT_SECRET=<generate-secure-secret>
   PORT=10000
   ```

3. **MongoDB Atlas Setup**
   - Create account at [mongodb.com/atlas](https://mongodb.com/atlas)
   - Create cluster
   - Get connection string
   - Add to MONGODB_URI

### 3. Backend URL
```
https://mobile-recharge-backend.onrender.com
```

## Frontend Deployment Options

### Option 1: Netlify (Recommended)
1. Connect GitHub repository
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
3. Environment variables:
   ```
   REACT_APP_API_URL=https://mobile-recharge-backend.onrender.com/api
   ```

### Option 2: Render Static Site
1. Create Static Site
2. Connect repository
3. Build command: `npm run build`
4. Publish directory: `build`

## Post-Deployment Steps

1. **Update CORS Origins**
   - Add frontend URL to backend CORS configuration

2. **Test Endpoints**
   ```bash
   curl https://mobile-recharge-backend.onrender.com/health
   ```

3. **Seed Database** (Optional)
   ```bash
   # Run seed scripts via Render console
   npm run seed
   ```

## Environment Variables Summary

### Backend (.env)
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mobile-recharge
JWT_SECRET=your-super-secure-jwt-secret-key
PORT=10000
```

### Frontend (.env.production)
```
REACT_APP_API_URL=https://mobile-recharge-backend.onrender.com/api
GENERATE_SOURCEMAP=false
```

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Update allowed origins in server.js
2. **Database Connection**: Check MongoDB Atlas IP whitelist
3. **Build Failures**: Ensure Node.js version compatibility

### Logs:
- Backend: Render dashboard → Service → Logs
- Frontend: Netlify dashboard → Site → Functions

## URLs After Deployment
- **Backend API**: https://mobile-recharge-backend.onrender.com
- **Frontend**: https://mobile-recharge-app.netlify.app (or your custom domain)