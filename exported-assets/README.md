# ProBet Pro Server - Professional Sports Betting Calculator API

## 🚀 Overview

ProBet Pro Server is a professional-grade API for sports betting calculations with advanced mathematical models, secure API key management, and comprehensive risk analysis tools.

## 🏗️ Architecture

```
probet-pro-server/
├── src/
│   ├── config/           # Configuration files
│   │   ├── database.js   # PostgreSQL configuration
│   │   ├── redis.js      # Redis configuration
│   │   └── swagger.js    # API documentation
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   │   ├── apiKeyService.js    # Secure API key management
│   │   ├── mathEngine.js       # Advanced mathematical models
│   │   └── bettingService.js   # Betting calculations
│   ├── utils/           # Utility functions
│   └── server.js        # Main application entry
├── tests/               # Test files
├── monitoring/          # Monitoring configurations
├── nginx/              # Nginx configuration
└── docker-compose.yml  # Complete development environment
```

## 🔧 Features

### 🔐 Security
- **Secure API Key Management**: Encrypted storage, automatic rotation
- **JWT Authentication**: Stateless authentication with refresh tokens
- **Rate Limiting**: Configurable per-endpoint rate limits
- **Input Validation**: Comprehensive request validation
- **CORS Protection**: Configurable CORS policies
- **Helmet Security**: Security headers and CSP

### 🧮 Mathematical Engine
- **Advanced Kelly Criterion**: Multi-outcome optimization
- **Poisson Models**: Time-varying intensity distributions
- **Skellam Distribution**: Score difference modeling
- **Risk Metrics**: VaR, CVaR, Sharpe, Sortino ratios
- **Portfolio Optimization**: Mean-variance optimization
- **Monte Carlo Simulation**: Risk scenario modeling

### 📊 Analytics
- **Real-time Monitoring**: Prometheus + Grafana
- **Logging**: Structured logging with Winston
- **Performance Tracking**: Request timing and metrics
- **Error Tracking**: Comprehensive error handling
- **Health Checks**: Application and dependency monitoring

### 🗄️ Data Management
- **PostgreSQL**: Primary database with connection pooling
- **Redis**: Caching and session management
- **Data Validation**: Schema validation with Joi
- **Migrations**: Database schema versioning
- **Backup**: Automated backup strategies

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/probet-pro/server.git
cd probet-pro-server
```

2. **Environment Setup**
```bash
cp env.example .env
# Edit .env with your configuration
```

3. **Start with Docker Compose**
```bash
docker-compose up -d
```

4. **Manual Installation**
```bash
npm install
npm run db:migrate
npm run dev
```

### Environment Variables

```bash
# Server Configuration
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_NAME=probet_pro
DB_USERNAME=postgres
DB_PASSWORD=your_password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Security
JWT_SECRET=your_jwt_secret_minimum_32_characters
ENCRYPTION_KEY=your_32_character_encryption_key
BCRYPT_ROUNDS=12

# API Keys
ODDS_API_KEY=your_odds_api_key
SPORTS_API_KEY=your_sports_api_key
```

## 📚 API Documentation

### Authentication

All API endpoints require authentication via API key or JWT token.

#### API Key Authentication
```bash
curl -H "X-API-Key: pb_test_your_api_key" \
     http://localhost:3000/api/math/kelly
```

#### JWT Authentication
```bash
curl -H "Authorization: Bearer your_jwt_token" \
     http://localhost:3000/api/betting/portfolio
```

### Core Endpoints

#### Mathematical Calculations

**Kelly Criterion**
```http
POST /api/math/kelly
Content-Type: application/json

{
  "probabilities": [0.6, 0.4],
  "odds": [2.5, 3.0],
  "correlation": 0.1
}
```

**Poisson Distribution**
```http
POST /api/math/poisson
Content-Type: application/json

{
  "lambda": 2.5,
  "time": 0.5,
  "seasonality": 0.1
}
```

**Risk Analysis**
```http
POST /api/math/risk
Content-Type: application/json

{
  "returns": [-0.02, 0.05, -0.01, 0.03, -0.04],
  "method": "montecarlo",
  "confidence": 0.95
}
```

#### API Key Management

**Create API Key**
```http
POST /api/keys
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "name": "Production Key",
  "permissions": ["math:read", "betting:write"],
  "environment": "production"
}
```

**List API Keys**
```http
GET /api/keys
Authorization: Bearer jwt_token
```

**Revoke API Key**
```http
DELETE /api/keys/:keyId
Authorization: Bearer jwt_token
```

#### Betting Operations

**Create Bet**
```http
POST /api/betting/bets
X-API-Key: your_api_key
Content-Type: application/json

{
  "sport": "football",
  "homeTeam": "Arsenal",
  "awayTeam": "Chelsea",
  "odds": 2.5,
  "probability": 0.45,
  "stake": 100
}
```

**Portfolio Analysis**
```http
GET /api/betting/portfolio
X-API-Key: your_api_key
```

### Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req_123456",
    "rateLimit": {
      "remaining": 95,
      "reset": 1642248600
    }
  }
}
```

Error responses:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input parameters",
    "details": {
      "field": "probability",
      "issue": "Must be between 0 and 1"
    }
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req_123456"
  }
}
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run specific test suite
npm test -- --grep "Kelly Criterion"
```

## 📊 Monitoring

### Health Checks
- **Application**: `GET /health`
- **Database**: `GET /health/database`
- **Redis**: `GET /health/redis`
- **Dependencies**: `GET /health/dependencies`

### Metrics
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3001 (admin/admin123)
- **API Documentation**: http://localhost:3000/api-docs

### Logging
- **Application Logs**: `./logs/app.log`
- **Error Logs**: `./logs/error.log`
- **Access Logs**: `./logs/access.log`
- **Kibana**: http://localhost:5601

## 🔒 Security Best Practices

### API Key Security
- Keys are hashed using bcrypt before storage
- Sensitive data encrypted with AES-256
- Automatic key rotation available
- Rate limiting per key
- Usage tracking and analytics

### Authentication
- JWT tokens with short expiration
- Refresh token rotation
- Secure password hashing (bcrypt)
- Session management via Redis
- CSRF protection

### Network Security
- HTTPS enforcement in production
- Security headers (Helmet.js)
- CORS configuration
- Request size limiting
- SQL injection prevention

## 🚀 Deployment

### Docker Production
```bash
# Build production image
docker build -t probet-pro:latest .

# Run with environment variables
docker run -d \
  --name probet-pro \
  -p 3000:3000 \
  --env-file .env.production \
  probet-pro:latest
```

### Kubernetes
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: probet-pro
spec:
  replicas: 3
  selector:
    matchLabels:
      app: probet-pro
  template:
    metadata:
      labels:
        app: probet-pro
    spec:
      containers:
      - name: probet-pro
        image: probet-pro:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DB_HOST
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: host
```

### Environment-specific Configurations

**Development**
- Hot reloading with nodemon
- Detailed logging
- Database synchronization
- Debug mode enabled

**Staging**
- Production-like environment
- Limited logging
- Performance testing
- Security scanning

**Production**
- Optimized for performance
- Minimal logging
- Health monitoring
- Auto-scaling ready

## 📈 Performance Optimization

### Caching Strategy
- **Redis**: API responses, user sessions
- **Application**: In-memory calculation cache
- **CDN**: Static assets and documentation
- **Database**: Query result caching

### Database Optimization
- Connection pooling (20 max connections)
- Query optimization and indexing
- Read replicas for analytics
- Automated vacuum and analyze

### API Optimization
- Response compression (gzip)
- Request/response size limits
- Efficient serialization
- Pagination for large datasets

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write comprehensive tests
- Document API changes
- Update version numbers
- Add migration scripts for DB changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [API Docs](http://localhost:3000/api-docs)
- **Issues**: [GitHub Issues](https://github.com/probet-pro/server/issues)
- **Email**: support@probet-pro.com
- **Discord**: [ProBet Pro Community](https://discord.gg/probet-pro)

## 🗺️ Roadmap

- [ ] Machine Learning Models Integration
- [ ] Real-time Odds API Integration
- [ ] Advanced Portfolio Analytics
- [ ] Mobile SDK Development
- [ ] Blockchain Integration
- [ ] AI-powered Risk Assessment

---

**⚠️ Disclaimer**: This software is for educational and research purposes only. Sports betting involves risk and should be done responsibly. Always gamble within your means and follow local regulations. 