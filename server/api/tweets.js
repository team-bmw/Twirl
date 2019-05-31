
const router = require('express').Router();
const { fetchTweets } = require('../twitter/fetchTweets');
const { tweetsToWordFrequencies } = require('../twitter/parseTweets');

// fetch and send 500 tweets, using query string
router.get('/:query', (req, res, next) => {
    fetchTweets(req.params.query, 500)
        .then(tweets => res.send(tweetsToWordFrequencies(tweets, 'adjective')))
        .catch(err => console.log(err));
});

module.exports = router;
