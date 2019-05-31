
const router = require('express').Router();
const { fetchTweets } = require('../twitter/fetchTweets');

// fetch and send 500 tweets, using query string
router.get('/:query', (req, res, next) => {
    fetchTweets(req.params.query, 500)
        .then(tweets => res.send(tweets))
        .catch(err => console.log(err));
});

module.exports = router;
