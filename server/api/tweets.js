
const router = require('express').Router();
const { fetchTweets } = require('../twitter/fetchTweets');
const { tweetsToWordFrequencies, adjectivesToWordFrequencies } = require('../twitter/parseTweets');

// fetch and send 500 tweets, using query string
router.get('/:query', (req, res, next) => {
    fetchTweets(req.params.query, 5)
        .then(tweets => res.send(adjectivesToWordFrequencies(tweets)))
        .catch(err => console.log(err));
});

module.exports = router;
