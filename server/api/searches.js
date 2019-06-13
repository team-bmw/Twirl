const router = require('express').Router();
const { Tweet, Metadata } = require('../db/index');
const { adjectivesToWordFrequencies } = require('../twitter/parseTweets');

// fetch adjective word frequency objects
router.get('/', (req, res, next) => {
    Metadata.findAll()
        .then(metadata => metadata.reduce((acc, m) => {
            if (!acc[m.search_id]) acc[m.search_id] = m.query;
            return acc;
        }, {}))
        .then(searches => res.send(searches))
        .catch(next);
})

router.get('/:search_id', (req, res, next) => {
    Tweet.findAll({
        where: {
            search_id: req.params.search_id,
        },
    })
        .then(tweets => adjectivesToWordFrequencies(tweets))
        .then(adj => res.send(adj))
        .catch(next);
})

module.exports = router;
