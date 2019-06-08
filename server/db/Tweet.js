const db = require('./db');

const Tweet = db.define('tweets', {
    text: {
        type: db.Sequelize.TEXT,
    },
    location: {
        type: db.Sequelize.TEXT,
    },
    numFollowers: {
        type: db.Sequelize.INTEGER,
    },
    numFriends: {
        type: db.Sequelize.INTEGER,
    },
    numFavorites: {
        type: db.Sequelize.INTEGER,
    },
    numRetweets: {
        type: db.Sequelize.INTEGER,
    },
    userVerified: {
        type: db.Sequelize.BOOLEAN,
    },
    isRetweet: {
        type: db.Sequelize.BOOLEAN,
    },
    query: {
        type: db.Sequelize.STRING,
    },
    sentiment: {
        type: db.Sequelize.FLOAT,
    },
    twitterId: {
        type: db.Sequelize.STRING,
        unique: true,
    },
    twitterUserId: {
        type: db.Sequelize.STRING,
    },
});

module.exports = Tweet;
