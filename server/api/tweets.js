const router = require('express').Router();
const { fetchTweets } = require('../twitter/fetchTweets');
const {
  tweetsToWordFrequencies,
  adjectivesToWordFrequencies,
  nounsToWordFrequencies,
} = require('../twitter/parseTweets');
const { db } = require('../db/index');

// fetch 500 tweets and return word frequency objects
router.get('/:query', (req, res, next) => {
  fetchTweets(req.params.query, 500)
    .then(tweets => res.send(tweetsToWordFrequencies(tweets)))
    .catch(err => console.log(err));
});

// fetch 500 tweets
router.get('/adjectives/:query', (req, res, next) => {
  fetchTweets(req.params.query, 500)
    .then(tweets => adjectivesToWordFrequencies(tweets))
    .then(adj => res.send(adj))
    .catch(err => console.log(err));
});

router.get('/nouns/:query', (req, res, next) => {
  fetchTweets(req.params.query, 500)
    .then(tweets => nounsToWordFrequencies(tweets))
    .then(adj => res.send(adj))
    .catch(err => console.log(err));
});

router.post('/reset', (req, res, next) => {
  db.sync({ force: true })
    .then(() => console.log('Database cleared and synced'))
    .then(() => fetchTweets(req.body.query, 500)
      .then(tweets => console.log(tweets)));
})

module.exports = router;
