@echo off
echo Setting up Mobile Recharge App...

echo.
echo Installing backend dependencies...
cd backend
call npm install

echo.
echo Installing frontend dependencies...
cd ..
call npm install

echo.
echo Setup complete!
echo.
echo To start the application:
echo 1. Start MongoDB service
echo 2. Run 'npm run start-backend' to start the backend server
echo 3. Run 'npm start' to start the frontend

pause