# GitHub to Render Deployment Guide

## 🚀 Deploy from GitHub to Render

### Step 1: Push to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - Mobile Recharge App"

# Add GitHub remote
git remote add origin https://github.com/yourusername/mobile-recharge-app.git

# Push to GitHub
git push -u origin main
```

### Step 2: Deploy Backend to Render

1. **Go to [render.com](https://render.com)**
2. **Sign up/Login with GitHub**
3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Select your repository

4. **Configure Service**
   ```
   Name: mobile-recharge-backend
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

5. **Add Environment Variables**
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/mobile-recharge
   JWT_SECRET=your-super-secure-jwt-secret-key
   PORT=10000
   ```

### Step 3: Deploy Frontend to Netlify

1. **Go to [netlify.com](https://netlify.com)**
2. **Connect GitHub repository**
3. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: build
   ```

4. **Environment Variables**
   ```
   REACT_APP_API_URL=https://mobile-recharge-backend.onrender.com/api
   ```

### Step 4: Setup MongoDB Atlas

1. **Create account at [mongodb.com/atlas](https://mongodb.com/atlas)**
2. **Create cluster**
3. **Get connection string**
4. **Update MONGODB_URI in Render**

### Step 5: Update CORS (After Frontend Deployment)

Update backend `server.js` with your frontend URL:
```javascript
const allowedOrigins = [
  'https://your-app.netlify.app',
  'https://mobile-recharge-backend.onrender.com'
];
```

## 🔄 Auto-Deploy Setup

- **Backend**: Automatically deploys when you push to `main` branch
- **Frontend**: Automatically deploys when you push to `main` branch

## 📝 Git Commands for Updates

```bash
# Make changes to your code
git add .
git commit -m "Your update message"
git push origin main
```

## 🌐 Final URLs

After deployment:
- **Backend**: `https://mobile-recharge-backend.onrender.com`
- **Frontend**: `https://your-app.netlify.app`

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Netlify
- [ ] Environment variables configured
- [ ] CORS origins updated
- [ ] Test all functionality