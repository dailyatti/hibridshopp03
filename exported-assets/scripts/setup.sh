#!/bin/bash

# ProBet Pro Server Setup Script
# This script sets up the development environment

set -e

echo "🚀 Setting up ProBet Pro Server..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_nodejs() {
    print_status "Checking Node.js installation..."
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_success "Node.js is installed: $NODE_VERSION"
        
        # Check if version is 18 or higher
        NODE_MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
        if [ "$NODE_MAJOR_VERSION" -lt 18 ]; then
            print_error "Node.js version 18 or higher is required. Current version: $NODE_VERSION"
            exit 1
        fi
    else
        print_error "Node.js is not installed. Please install Node.js 18 or higher."
        exit 1
    fi
}

# Check if Docker is installed
check_docker() {
    print_status "Checking Docker installation..."
    if command -v docker &> /dev/null; then
        DOCKER_VERSION=$(docker --version)
        print_success "Docker is installed: $DOCKER_VERSION"
    else
        print_warning "Docker is not installed. Some features may not work."
    fi
    
    if command -v docker-compose &> /dev/null; then
        COMPOSE_VERSION=$(docker-compose --version)
        print_success "Docker Compose is installed: $COMPOSE_VERSION"
    else
        print_warning "Docker Compose is not installed. Some features may not work."
    fi
}

# Create necessary directories
create_directories() {
    print_status "Creating necessary directories..."
    
    directories=(
        "logs"
        "uploads"
        "backups"
        "tests/fixtures"
        "src/models"
        "src/controllers"
        "src/routes"
        "src/middleware"
        "monitoring/grafana/dashboards"
        "monitoring/grafana/datasources"
        "monitoring/logstash/config"
        "nginx/ssl"
        "database/init"
        "redis"
    )
    
    for dir in "${directories[@]}"; do
        mkdir -p "$dir"
        print_success "Created directory: $dir"
    done
}

# Install Node.js dependencies
install_dependencies() {
    print_status "Installing Node.js dependencies..."
    
    if [ -f "package.json" ]; then
        npm install
        print_success "Dependencies installed successfully"
    else
        print_error "package.json not found"
        exit 1
    fi
}

# Setup environment variables
setup_environment() {
    print_status "Setting up environment variables..."
    
    if [ ! -f ".env" ]; then
        if [ -f "env.example" ]; then
            cp env.example .env
            print_success "Created .env file from env.example"
            print_warning "Please edit .env file with your configuration"
        else
            print_error "env.example file not found"
            exit 1
        fi
    else
        print_warning ".env file already exists"
    fi
}

# Generate secure keys
generate_keys() {
    print_status "Generating secure keys..."
    
    # Generate JWT secret
    JWT_SECRET=$(openssl rand -base64 32)
    JWT_REFRESH_SECRET=$(openssl rand -base64 32)
    ENCRYPTION_KEY=$(openssl rand -hex 16)
    ENCRYPTION_IV=$(openssl rand -hex 8)
    SESSION_SECRET=$(openssl rand -base64 32)
    
    # Update .env file with generated keys
    if [ -f ".env" ]; then
        sed -i.bak "s/your_super_secret_jwt_key_here_minimum_32_characters/$JWT_SECRET/g" .env
        sed -i.bak "s/your_refresh_secret_key_here_minimum_32_characters/$JWT_REFRESH_SECRET/g" .env
        sed -i.bak "s/your_32_character_encryption_key_here/$ENCRYPTION_KEY/g" .env
        sed -i.bak "s/your_16_character_iv_here/$ENCRYPTION_IV/g" .env
        sed -i.bak "s/your_session_secret_here/$SESSION_SECRET/g" .env
        
        # Remove backup file
        rm .env.bak 2>/dev/null || true
        
        print_success "Secure keys generated and updated in .env file"
    fi
}

# Setup database
setup_database() {
    print_status "Setting up database..."
    
    # Check if PostgreSQL is running
    if command -v psql &> /dev/null; then
        print_success "PostgreSQL client is available"
    else
        print_warning "PostgreSQL client not found. Using Docker instead."
    fi
    
    # Run database migrations if available
    if [ -f "package.json" ] && npm run | grep -q "db:migrate"; then
        print_status "Running database migrations..."
        npm run db:migrate || print_warning "Database migrations failed or not available"
    fi
}

# Setup Redis configuration
setup_redis() {
    print_status "Setting up Redis configuration..."
    
    cat > redis/redis.conf << EOF
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
EOF
    
    print_success "Redis configuration created"
}

# Setup Nginx configuration
setup_nginx() {
    print_status "Setting up Nginx configuration..."
    
    cat > nginx/nginx.conf << EOF
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
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }
        
        location /health {
            proxy_pass http://api/health;
            access_log off;
        }
    }
}
EOF
    
    print_success "Nginx configuration created"
}

# Setup monitoring
setup_monitoring() {
    print_status "Setting up monitoring configuration..."
    
    # Prometheus configuration
    mkdir -p monitoring
    cat > monitoring/prometheus.yml << EOF
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'probet-pro-api'
    static_configs:
      - targets: ['api:3000']
    scrape_interval: 5s
    metrics_path: /metrics
EOF
    
    print_success "Monitoring configuration created"
}

# Run tests
run_tests() {
    print_status "Running tests..."
    
    if npm run | grep -q "test"; then
        npm test || print_warning "Some tests failed"
    else
        print_warning "No test script found"
    fi
}

# Main setup function
main() {
    echo "🏗️  ProBet Pro Server Setup"
    echo "=========================="
    echo ""
    
    check_nodejs
    check_docker
    create_directories
    install_dependencies
    setup_environment
    generate_keys
    setup_redis
    setup_nginx
    setup_monitoring
    setup_database
    
    echo ""
    echo "✅ Setup completed successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Edit .env file with your configuration"
    echo "2. Start the development environment: docker-compose up -d"
    echo "3. Or start manually: npm run dev"
    echo ""
    echo "Useful commands:"
    echo "- npm run dev          # Start development server"
    echo "- npm test             # Run tests"
    echo "- npm run lint         # Run linter"
    echo "- docker-compose up -d # Start with Docker"
    echo ""
    echo "Access points:"
    echo "- API Server: http://localhost:3000"
    echo "- API Docs: http://localhost:3000/api-docs"
    echo "- Grafana: http://localhost:3001"
    echo "- Prometheus: http://localhost:9090"
    echo ""
}

# Run main function
main "$@" 