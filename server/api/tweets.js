const router = require('express').Router();
const { fetchTweets } = require('../twitter/fetchTweets');
const {
  adjectivesToWordFrequencies,
  nounsToWordFrequencies,
} = require('../twitter/parseTweets');
const { db, Tweet } = require('../db/index');

// fetch adjective word frequency objects
router.get('/adjectives/:query', (req, res, next) => {
  Tweet.findAll({
    where: {
      query: req.params.query,
    },
  })
    .then(tweets => adjectivesToWordFrequencies(tweets))
    .then(adj => res.send(adj))
    .catch(next);
});

// fetch noun word frequency objects
router.get('/nouns/:query', (req, res, next) => {
  Tweet.findAll({
    where: {
      query: req.params.query,
    },
  })
    .then(tweets => nounsToWordFrequencies(tweets))
    .then(adj => res.send(adj))
    .catch(next);
});

// reset database and fetch 500 tweets
router.post('/reset', (req, res, next) => {
  db.sync({ force: true })
    .then(() => fetchTweets(req.body.query, 500))
    .then(() => res.sendStatus(201))
    .catch(next);
})

module.exports = router;
