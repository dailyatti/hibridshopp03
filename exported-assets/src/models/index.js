const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

// User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

// API Key model
const ApiKey = sequelize.define('ApiKey', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  keyHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  permissions: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  environment: {
    type: DataTypes.ENUM('development', 'production'),
    defaultValue: 'development'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  lastUsed: {
    type: DataTypes.DATE,
    allowNull: true
  },
  usageCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  rateLimit: {
    type: DataTypes.INTEGER,
    defaultValue: 100
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

// Bet model
const Bet = sequelize.define('Bet', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  sport: {
    type: DataTypes.STRING,
    allowNull: false
  },
  homeTeam: {
    type: DataTypes.STRING,
    allowNull: false
  },
  awayTeam: {
    type: DataTypes.STRING,
    allowNull: false
  },
  odds: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  probability: {
    type: DataTypes.DECIMAL(5, 4),
    allowNull: false
  },
  stake: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  kellyFraction: {
    type: DataTypes.DECIMAL(5, 4),
    allowNull: true
  },
  expectedValue: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  result: {
    type: DataTypes.ENUM('pending', 'won', 'lost', 'void'),
    defaultValue: 'pending'
  },
  payout: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  }
});

// Define associations
User.hasMany(ApiKey, { foreignKey: 'userId' });
ApiKey.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Bet, { foreignKey: 'userId' });
Bet.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  ApiKey,
  Bet
}; 