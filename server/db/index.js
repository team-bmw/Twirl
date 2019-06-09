const Tweet = require('./Tweet');
const Metadata = require('./Metadata');
const User = require('./User');
const db = require('./db');

// TODO: is Metadata table even useful? Delete?
Tweet.belongsTo(Metadata);
Metadata.hasMany(Tweet);

const syncDb = () => {
  return db
    .sync({ force: true })
    .then(() => console.log('Database is synced'))
    .catch(err => console.error(err));
};

module.exports = {
  Tweet,
  Metadata,
  User,
  db,
  syncDb,
};
