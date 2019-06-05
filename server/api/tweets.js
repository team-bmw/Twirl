const router = require('express').Router();
const { fetchTweets } = require('../twitter/fetchTweets');
const {
  tweetsToWordFrequencies,
  adjectivesToWordFrequencies,
  nounsToWordFrequencies,
} = require('../twitter/parseTweets');

// fetch and send 500 tweets, using query string
router.get('/:query', (req, res, next) => {
  fetchTweets(req.params.query, 100)
    .then(tweets => res.send(tweetsToWordFrequencies(tweets)))
    .catch(err => console.log(err));
});

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

module.exports = router;
