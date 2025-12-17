@echo off
echo 🚀 Starting Mobile Recharge App Development Environment
echo.

echo Checking system health...
node check-system.js

echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && echo Backend starting on port 5002... && npm start"

echo Waiting for backend to initialize...
timeout /t 3 /nobreak >nul

echo.
echo Starting Frontend Server...
start "Frontend Server" cmd /k "echo Frontend starting on port 3000... && npm start"

echo.
echo ✅ Development servers started!
echo 📡 Backend: http://localhost:5002
echo 🌐 Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause >nul