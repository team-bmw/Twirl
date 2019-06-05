const Tweet = require('./Tweet');
const Metadata = require('./Metadata');
const User = require('./User');
const db = require('./db');

// TODO: is Metadata table even useful? Delete?
Tweet.belongsTo(Metadata);
Metadata.hasMany(Tweet);

module.exports = {
    Tweet,
    Metadata,
    User,
    db,
};
