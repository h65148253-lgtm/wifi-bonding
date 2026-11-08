@echo off
title PLEXLINK Real-Time Aggregation System
echo ========================================================
echo    PLEXLINK — Dual-Path Wi-Fi + Android USB Tethering   
echo ========================================================
echo.
set "PATH=C:\Antigravity\nodejs\node-v20.18.0-win-x64;%PATH%"
cd /d "%~dp0"

echo [1/2] Starting PLEXLINK Native Agent on http://127.0.0.1:58432...
start "PLEXLINK Native Agent" /min cmd /c "node agent\windowsAgent.cjs"

timeout /t 2 /nobreak >nul

echo [2/2] Starting PLEXLINK Web Dashboard on http://localhost:5173...
start http://localhost:5173
call npx.cmd vite --host 0.0.0.0 --port 5173
pause

