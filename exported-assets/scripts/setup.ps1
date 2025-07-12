# ProBet Pro Server Setup Script (PowerShell)
# This script sets up the development environment on Windows

param(
    [switch]$SkipDocker,
    [switch]$SkipTests
)

# Set error action preference
$ErrorActionPreference = "Stop"

Write-Host "🚀 Setting up ProBet Pro Server..." -ForegroundColor Blue

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Check if Node.js is installed
function Test-NodeJS {
    Write-Status "Checking Node.js installation..."
    
    try {
        $nodeVersion = node --version
        Write-Success "Node.js is installed: $nodeVersion"
        
        # Check if version is 18 or higher
        $majorVersion = [int]($nodeVersion -replace 'v(\d+)\..*', '$1')
        if ($majorVersion -lt 18) {
            Write-Error "Node.js version 18 or higher is required. Current version: $nodeVersion"
            exit 1
        }
    }
    catch {
        Write-Error "Node.js is not installed. Please install Node.js 18 or higher."
        exit 1
    }
}

# Check if Docker is installed
function Test-Docker {
    if ($SkipDocker) {
        Write-Warning "Skipping Docker check as requested"
        return
    }
    
    Write-Status "Checking Docker installation..."
    
    try {
        $dockerVersion = docker --version
        Write-Success "Docker is installed: $dockerVersion"
    }
    catch {
        Write-Warning "Docker is not installed. Some features may not work."
    }
    
    try {
        $composeVersion = docker-compose --version
        Write-Success "Docker Compose is installed: $composeVersion"
    }
    catch {
        Write-Warning "Docker Compose is not installed. Some features may not work."
    }
}

# Create necessary directories
function New-ProjectDirectories {
    Write-Status "Creating necessary directories..."
    
    $directories = @(
        "logs",
        "uploads",
        "backups",
        "tests\fixtures",
        "src\models",
        "src\controllers",
        "src\routes",
        "src\middleware",
        "monitoring\grafana\dashboards",
        "monitoring\grafana\datasources",
        "monitoring\logstash\config",
        "nginx\ssl",
        "database\init",
        "redis"
    )
    
    foreach ($dir in $directories) {
        if (!(Test-Path $dir)) {
            New-Item -ItemType Directory -Path $dir -Force | Out-Null
            Write-Success "Created directory: $dir"
        }
    }
}

# Install Node.js dependencies
function Install-Dependencies {
    Write-Status "Installing Node.js dependencies..."
    
    if (Test-Path "package.json") {
        npm install
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Dependencies installed successfully"
        } else {
            Write-Error "Failed to install dependencies"
            exit 1
        }
    } else {
        Write-Error "package.json not found"
        exit 1
    }
}

# Setup environment variables
function Set-Environment {
    Write-Status "Setting up environment variables..."
    
    if (!(Test-Path ".env")) {
        if (Test-Path "env.example") {
            Copy-Item "env.example" ".env"
            Write-Success "Created .env file from env.example"
            Write-Warning "Please edit .env file with your configuration"
        } else {
            Write-Error "env.example file not found"
            exit 1
        }
    } else {
        Write-Warning ".env file already exists"
    }
}

# Generate secure keys
function New-SecureKeys {
    Write-Status "Generating secure keys..."
    
    # Generate random keys using .NET
    $jwtSecret = [Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
    $jwtRefreshSecret = [Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
    $encryptionKey = -join ((1..16) | ForEach {'{0:X2}' -f (Get-Random -Max 256)})
    $encryptionIV = -join ((1..8) | ForEach {'{0:X2}' -f (Get-Random -Max 256)})
    $sessionSecret = [Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
    
    # Update .env file with generated keys
    if (Test-Path ".env") {
        $envContent = Get-Content ".env"
        $envContent = $envContent -replace "your_super_secret_jwt_key_here_minimum_32_characters", $jwtSecret
        $envContent = $envContent -replace "your_refresh_secret_key_here_minimum_32_characters", $jwtRefreshSecret
        $envContent = $envContent -replace "your_32_character_encryption_key_here", $encryptionKey
        $envContent = $envContent -replace "your_16_character_iv_here", $encryptionIV
        $envContent = $envContent -replace "your_session_secret_here", $sessionSecret
        
        Set-Content ".env" $envContent
        Write-Success "Secure keys generated and updated in .env file"
    }
}

# Setup database
function Set-Database {
    Write-Status "Setting up database..."
    
    # Check if PostgreSQL is available
    try {
        psql --version | Out-Null
        Write-Success "PostgreSQL client is available"
    }
    catch {
        Write-Warning "PostgreSQL client not found. Using Docker instead."
    }
    
    # Run database migrations if available
    try {
        $packageJson = Get-Content "package.json" | ConvertFrom-Json
        if ($packageJson.scripts."db:migrate") {
            Write-Status "Running database migrations..."
            npm run db:migrate
        }
    }
    catch {
        Write-Warning "Database migrations failed or not available"
    }
}

# Setup Redis configuration
function Set-RedisConfig {
    Write-Status "Setting up Redis configuration..."
    
    $redisConfig = @"
# Redis configuration for ProBet Pro
port 6379
bind 127.0.0.1
timeout 0
keepalive 300
maxmemory 256mb
maxmemory-policy allkeys-lru
save 900 1
save 300 10
save 60 10000
rdbcompression yes
dbfilename dump.rdb
dir /data
appendonly yes
appendfsync everysec
"@
    
    Set-Content "redis\redis.conf" $redisConfig
    Write-Success "Redis configuration created"
}

# Setup Nginx configuration
function Set-NginxConfig {
    Write-Status "Setting up Nginx configuration..."
    
    $nginxConfig = @"
events {
    worker_connections 1024;
}

http {
    upstream api {
        server api:3000;
    }
    
    server {
        listen 80;
        server_name localhost;
        
        location / {
            proxy_pass http://api;
            proxy_set_header Host `$host;
            proxy_set_header X-Real-IP `$remote_addr;
            proxy_set_header X-Forwarded-For `$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto `$scheme;
        }
        
        location /health {
            proxy_pass http://api/health;
            access_log off;
        }
    }
}
"@
    
    Set-Content "nginx\nginx.conf" $nginxConfig
    Write-Success "Nginx configuration created"
}

# Setup monitoring
function Set-Monitoring {
    Write-Status "Setting up monitoring configuration..."
    
    $prometheusConfig = @"
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'probet-pro-api'
    static_configs:
      - targets: ['api:3000']
    scrape_interval: 5s
    metrics_path: /metrics
"@
    
    if (!(Test-Path "monitoring")) {
        New-Item -ItemType Directory -Path "monitoring" -Force | Out-Null
    }
    
    Set-Content "monitoring\prometheus.yml" $prometheusConfig
    Write-Success "Monitoring configuration created"
}

# Run tests
function Invoke-Tests {
    if ($SkipTests) {
        Write-Warning "Skipping tests as requested"
        return
    }
    
    Write-Status "Running tests..."
    
    try {
        $packageJson = Get-Content "package.json" | ConvertFrom-Json
        if ($packageJson.scripts.test) {
            npm test
        } else {
            Write-Warning "No test script found"
        }
    }
    catch {
        Write-Warning "Some tests failed"
    }
}

# Main setup function
function Start-Setup {
    Write-Host "🏗️  ProBet Pro Server Setup" -ForegroundColor Cyan
    Write-Host "==========================" -ForegroundColor Cyan
    Write-Host ""
    
    Test-NodeJS
    Test-Docker
    New-ProjectDirectories
    Install-Dependencies
    Set-Environment
    New-SecureKeys
    Set-RedisConfig
    Set-NginxConfig
    Set-Monitoring
    Set-Database
    Invoke-Tests
    
    Write-Host ""
    Write-Host "✅ Setup completed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Edit .env file with your configuration"
    Write-Host "2. Start the development environment: docker-compose up -d"
    Write-Host "3. Or start manually: npm run dev"
    Write-Host ""
    Write-Host "Useful commands:" -ForegroundColor Yellow
    Write-Host "- npm run dev          # Start development server"
    Write-Host "- npm test             # Run tests"
    Write-Host "- npm run lint         # Run linter"
    Write-Host "- docker-compose up -d # Start with Docker"
    Write-Host ""
    Write-Host "Access points:" -ForegroundColor Yellow
    Write-Host "- API Server: http://localhost:3000"
    Write-Host "- API Docs: http://localhost:3000/api-docs"
    Write-Host "- Grafana: http://localhost:3001"
    Write-Host "- Prometheus: http://localhost:9090"
    Write-Host ""
}

# Run main function
try {
    Start-Setup
}
catch {
    Write-Error "Setup failed: $($_.Exception.Message)"
    exit 1
} 