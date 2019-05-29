const Tweet = require('./Tweet');
const Metadata = require('../models/Metadata');
const db = require('../models/db');

// TODO: is Metadata table even useful? Delete?
Tweet.belongsTo(Metadata);
Metadata.hasMany(Tweet);

module.exports = {
    Tweet,
    Metadata,
    db,
};
