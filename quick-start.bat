@echo off
echo 🚀 Quick Start - Mobile Recharge App
echo.

echo Killing any existing processes on port 5002...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5002') do taskkill /PID %%a /F >nul 2>&1

echo Starting Backend...
start "Backend" cmd /k "cd backend && echo Backend Server Starting... && node server.js"

timeout /t 3 /nobreak >nul

echo Starting Frontend...
start "Frontend" cmd /k "echo Frontend Server Starting... && npm start"

echo.
echo ✅ Servers starting...
echo 📡 Backend: http://localhost:5002
echo 🌐 Frontend: http://localhost:3000
pause