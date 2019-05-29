const db = require('./db');

const Tweet = db.define('tweets', {
    text: {
        type: db.Sequelize.TEXT,
    },
    query: {
        type: db.Sequelize.STRING,
    },
    twitterId: {
        type: db.Sequelize.STRING,
    }
});

module.exports = Tweet;
