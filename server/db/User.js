const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  twitterId: {
    type: Sequelize.STRING,
  },
  twitterUsername: {
    type: Sequelize.STRING,
  },
  twitterDisplayName: {
    type: Sequelize.STRING,
  },
  twitterPhoto: {
    type: Sequelize.STRING,
  },
});

module.exports = User;

