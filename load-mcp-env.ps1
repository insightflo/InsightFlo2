# Load MCP API keys from local file
# This script loads API keys from .mcp.keys.json and sets them as environment variables

$keysFile = ".mcp.keys.json"

if (-not (Test-Path $keysFile)) {
    Write-Error "ERROR: .mcp.keys.json file not found!"
    Write-Host "Please create .mcp.keys.json with your API keys."
    Write-Host "Example:"
    Write-Host "{"
    Write-Host '  "OBSIDIAN_API_KEY": "your_obsidian_key",'
    Write-Host '  "SUPABASE_ACCESS_TOKEN": "your_supabase_token",'
    Write-Host '  "GEMINI_API_KEY": "your_gemini_key"',
    Write-Host '  "GOOGLE_API_KEY": "your_google_key"'
    Write-Host "}"
    Read-Host "Press Enter to exit"
    exit 1
}

try {
    $keys = Get-Content $keysFile | ConvertFrom-Json
    
    # Set environment variables
    $env:OBSIDIAN_API_KEY = $keys.OBSIDIAN_API_KEY
    $env:SUPABASE_ACCESS_TOKEN = $keys.SUPABASE_ACCESS_TOKEN
    $env:GEMINI_API_KEY = $keys.GEMINI_API_KEY
    $env:GOOGLE_API_KEY  = $keys.GOOGLE_API_KEY
    
    Write-Host "Environment variables loaded successfully!" -ForegroundColor Green
    Write-Host "OBSIDIAN_API_KEY: $($keys.OBSIDIAN_API_KEY.Substring(0, [Math]::Min(10, $keys.OBSIDIAN_API_KEY.Length)))..."
    Write-Host "SUPABASE_ACCESS_TOKEN: $($keys.SUPABASE_ACCESS_TOKEN.Substring(0, [Math]::Min(10, $keys.SUPABASE_ACCESS_TOKEN.Length)))..."
    Write-Host "GEMINI_API_KEY: $($keys.GEMINI_API_KEY.Substring(0, [Math]::Min(10, $keys.GEMINI_API_KEY.Length)))..."
    Write-Host "GOOGLE_API_KEY: $($keys.GOOGLE_API_KEY.Substring(0, [Math]::Min(10, $keys.GOOGLE_API_KEY.Length)))..."
    
    Write-Host "`nMCP environment variables are now loaded." -ForegroundColor Yellow
    Write-Host "You can now run Claude Code from this PowerShell session." -ForegroundColor Yellow
    
} catch {
    Write-Error "Failed to load keys: $($_.Exception.Message)"
    Read-Host "Press Enter to exit"
    exit 1
}