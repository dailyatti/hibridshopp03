const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ProBet Pro API',
      version: '1.0.0',
      description: 'Professional Sports Betting Calculator API with advanced mathematical models',
      contact: {
        name: 'ProBet Pro Team',
        email: 'support@probet-pro.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server'
      },
      {
        url: 'https://api.probet-pro.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'X-API-Key'
        },
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'object',
              properties: {
                code: {
                  type: 'string',
                  example: 'VALIDATION_ERROR'
                },
                message: {
                  type: 'string',
                  example: 'Invalid input parameters'
                },
                details: {
                  type: 'object'
                }
              }
            },
            meta: {
              type: 'object',
              properties: {
                timestamp: {
                  type: 'string',
                  format: 'date-time'
                },
                requestId: {
                  type: 'string'
                }
              }
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object'
            },
            meta: {
              type: 'object',
              properties: {
                timestamp: {
                  type: 'string',
                  format: 'date-time'
                },
                requestId: {
                  type: 'string'
                }
              }
            }
          }
        },
        KellyRequest: {
          type: 'object',
          required: ['probabilities', 'odds'],
          properties: {
            probabilities: {
              type: 'array',
              items: {
                type: 'number',
                minimum: 0,
                maximum: 1
              },
              example: [0.6, 0.4]
            },
            odds: {
              type: 'array',
              items: {
                type: 'number',
                minimum: 1
              },
              example: [2.5, 3.0]
            },
            correlation: {
              type: 'number',
              minimum: -1,
              maximum: 1,
              default: 0,
              example: 0.1
            }
          }
        },
        PoissonRequest: {
          type: 'object',
          required: ['lambda'],
          properties: {
            lambda: {
              type: 'number',
              minimum: 0.001,
              example: 2.5
            },
            time: {
              type: 'number',
              default: 0,
              example: 0.5
            },
            seasonality: {
              type: 'number',
              default: 0,
              example: 0.1
            }
          }
        },
        Bet: {
          type: 'object',
          required: ['sport', 'homeTeam', 'awayTeam', 'odds', 'probability', 'stake'],
          properties: {
            sport: {
              type: 'string',
              example: 'football'
            },
            homeTeam: {
              type: 'string',
              example: 'Arsenal'
            },
            awayTeam: {
              type: 'string',
              example: 'Chelsea'
            },
            odds: {
              type: 'number',
              minimum: 1,
              example: 2.5
            },
            probability: {
              type: 'number',
              minimum: 0,
              maximum: 1,
              example: 0.45
            },
            stake: {
              type: 'number',
              minimum: 0,
              example: 100
            }
          }
        }
      }
    },
    security: [
      {
        ApiKeyAuth: []
      },
      {
        BearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js'], // Path to the API files
};

const specs = swaggerJsdoc(options);

module.exports = specs; 