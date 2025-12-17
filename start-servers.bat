@echo off
setlocal enabledelayedexpansion
color 0A
title Mobile Recharge App - Server Manager

echo ========================================
echo    Mobile Recharge App Server Manager
echo ========================================
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

:: Check if npm is available
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm is not available
    pause
    exit /b 1
)

echo [INFO] Node.js and npm are available
echo.

:: Check if backend dependencies are installed
if not exist "backend\node_modules" (
    echo [WARNING] Backend dependencies not found
    echo Installing backend dependencies...
    cd backend
    npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install backend dependencies
        pause
        exit /b 1
    )
    cd ..
    echo [SUCCESS] Backend dependencies installed
    echo.
)

:: Check if frontend dependencies are installed
if not exist "node_modules" (
    echo [WARNING] Frontend dependencies not found
    echo Installing frontend dependencies...
    npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install frontend dependencies
        pause
        exit /b 1
    )
    echo [SUCCESS] Frontend dependencies installed
    echo.
)

:: Check if ports are available
echo [INFO] Checking port availability...
netstat -an | find ":5000" >nul
if not errorlevel 1 (
    echo [WARNING] Port 5000 is already in use
    echo Please close any application using port 5000 or the backend may fail to start
    echo.
)

netstat -an | find ":3000" >nul
if not errorlevel 1 (
    echo [WARNING] Port 3000 is already in use
    echo Please close any application using port 3000 or the frontend may fail to start
    echo.
)

:: Display startup options
echo Select startup mode:
echo [1] Development Mode (with auto-reload)
echo [2] Production Mode (standard)
echo [3] Backend Only
echo [4] Frontend Only
echo [5] Run Tests
echo [6] Seed Database
echo [7] Exit
echo.
set /p choice="Enter your choice (1-7): "

if "%choice%"=="1" goto dev_mode
if "%choice%"=="2" goto prod_mode
if "%choice%"=="3" goto backend_only
if "%choice%"=="4" goto frontend_only
if "%choice%"=="5" goto run_tests
if "%choice%"=="6" goto seed_db
if "%choice%"=="7" goto exit

echo [ERROR] Invalid choice. Starting in production mode...
echo.
goto prod_mode

:dev_mode
echo ========================================
echo    Starting in Development Mode
echo ========================================
echo.
echo [INFO] Starting Backend Server (Development)...
start "Backend Dev Server" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak > nul
echo [INFO] Starting Frontend (Development)...
start "Frontend Dev Server" cmd /k "npm start"
goto show_urls

:prod_mode
echo ========================================
echo    Starting in Production Mode
echo ========================================
echo.
echo [INFO] Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm start"
timeout /t 3 /nobreak > nul
echo [INFO] Starting Frontend...
start "Frontend" cmd /k "npm start"
goto show_urls

:backend_only
echo ========================================
echo    Starting Backend Only
echo ========================================
echo.
echo [INFO] Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm start"
echo [SUCCESS] Backend server is starting...
echo Backend URL: http://localhost:5000
echo API Health Check: http://localhost:5000/api/health
goto end

:frontend_only
echo ========================================
echo    Starting Frontend Only
echo ========================================
echo.
echo [INFO] Starting Frontend...
start "Frontend" cmd /k "npm start"
echo [SUCCESS] Frontend is starting...
echo Frontend URL: http://localhost:3000
goto end

:run_tests
echo ========================================
echo    Running Tests
echo ========================================
echo.
echo [INFO] Running Backend Tests...
cd backend
npm test 2>nul || (
    echo [INFO] Running available test files...
    if exist "test-connection.js" node test-connection.js
    if exist "test-db.js" node test-db.js
    if exist "test-api.js" node test-api.js
    if exist "test-auth.js" node test-auth.js
)
cd ..
echo.
echo [INFO] Running Frontend Tests...
npm test -- --watchAll=false --passWithNoTests
goto end

:seed_db
echo ========================================
echo    Seeding Database
echo ========================================
echo.
echo [INFO] Seeding database with complete data...
cd backend

echo [INFO] Seeding users and basic data...
if exist "seed.js" (
    node seed.js
) else if exist "seedData.js" (
    node seedData.js
) else (
    echo [WARNING] Basic seed file not found
)

echo.
echo [INFO] Seeding basic plans...
if exist "seedPlans.js" (
    node seedPlans.js
) else (
    echo [WARNING] Basic plans seed file not found
)

echo.
echo [INFO] Seeding advanced plans...
if exist "seedAdvancedPlans.js" (
    node seedAdvancedPlans.js
) else (
    echo [WARNING] Advanced plans seed file not found
)

echo.
echo [SUCCESS] Database seeding completed!
cd ..
goto end

:show_urls
echo.
echo ========================================
echo    Servers Starting Successfully!
echo ========================================
echo.
echo [SUCCESS] Both servers are starting...
echo.
echo Application URLs:
echo   Frontend:     http://localhost:3000
echo   Backend API:  http://localhost:5000
echo   Health Check: http://localhost:5000/api/health
echo.
echo Useful Commands:
echo   - Press Ctrl+C in server windows to stop
echo   - Check server logs in the opened windows
echo   - Backend logs show API requests
echo   - Frontend will auto-open in browser
echo.
echo Troubleshooting:
echo   - If ports are busy, close other applications
echo   - Check .env files for configuration
echo   - Restart script if servers fail to start
echo.

:end
echo.
echo Press any key to exit...
pause >nul

:exit
echo Goodbye!
exit /b 0