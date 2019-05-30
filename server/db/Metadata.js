const db = require('./db');

const Metadata = db.define('metadata', {
    count: {
        type: db.Sequelize.INTEGER,
    },
    query: {
        type: db.Sequelize.STRING,
    },
    next_id: {
        type: db.Sequelize.STRING,
    }
});

module.exports = Metadata;
