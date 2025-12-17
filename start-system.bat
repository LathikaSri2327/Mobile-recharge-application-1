@echo off
echo Starting Mobile Recharge App System...
echo.

echo Checking MongoDB...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✅ MongoDB is running
) else (
    echo ❌ MongoDB is not running. Please start MongoDB first.
    echo Run: net start MongoDB
    pause
    exit /b 1
)

echo.
echo Starting Backend Server...
start "Backend" cmd /k "cd backend && npm start"

echo Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo.
echo Starting Frontend Server...
start "Frontend" cmd /k "npm start"

echo.
echo ✅ System started successfully!
echo Backend: http://localhost:5002
echo Frontend: http://localhost:3000
echo.
pause