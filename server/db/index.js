const Tweet = require('./Tweet');
const Metadata = require('./Metadata');
const db = require('./db');

// TODO: is Metadata table even useful? Delete?
Tweet.belongsTo(Metadata);
Metadata.hasMany(Tweet);

module.exports = {
    Tweet,
    Metadata,
    db,
};
