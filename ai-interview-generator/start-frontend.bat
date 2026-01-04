@echo off
title AI Interview Generator - Frontend Only
cd frontend
echo Installing dependencies...
call npm install
echo.
echo Starting frontend server...
call npm run dev
pause
