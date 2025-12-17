@echo off
echo Connecting Backend and Frontend...

echo Starting Backend Server...
start "Backend" cmd /k "cd backend && npm start"

timeout /t 5 /nobreak > nul

echo Starting Frontend Server...
start "Frontend" cmd /k "npm start"

echo.
echo Servers connected:
echo Backend: http://localhost:5002
echo Frontend: http://localhost:3000
echo API Proxy: Enabled