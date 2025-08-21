@echo off
REM Load MCP API keys from local file
REM This script loads API keys from .mcp.keys.json and sets them as environment variables

if not exist ".mcp.keys.json" (
    echo ERROR: .mcp.keys.json file not found!
    echo Please create .mcp.keys.json with your API keys.
    echo Example:
    echo {
    echo   "OBSIDIAN_API_KEY": "your_obsidian_key",
    echo   "SUPABASE_ACCESS_TOKEN": "your_supabase_token", 
    echo   "GEMINI_API_KEY": "your_gemini_key"
    echo }
    pause
    exit /b 1
)

REM Use PowerShell to parse JSON and set environment variables
for /f "delims=" %%i in ('powershell -Command "(Get-Content '.mcp.keys.json' | ConvertFrom-Json).OBSIDIAN_API_KEY"') do set OBSIDIAN_API_KEY=%%i
for /f "delims=" %%i in ('powershell -Command "(Get-Content '.mcp.keys.json' | ConvertFrom-Json).SUPABASE_ACCESS_TOKEN"') do set SUPABASE_ACCESS_TOKEN=%%i  
for /f "delims=" %%i in ('powershell -Command "(Get-Content '.mcp.keys.json' | ConvertFrom-Json).GEMINI_API_KEY"') do set GEMINI_API_KEY=%%i

echo Environment variables loaded successfully!
echo OBSIDIAN_API_KEY: %OBSIDIAN_API_KEY:~0,10%...
echo SUPABASE_ACCESS_TOKEN: %SUPABASE_ACCESS_TOKEN:~0,10%...
echo GEMINI_API_KEY: %GEMINI_API_KEY:~0,10%...

REM Keep the command prompt open with environment variables loaded
cmd /k "echo MCP environment variables are now loaded. You can run Claude Code from this session."