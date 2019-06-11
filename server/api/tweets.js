const router = require('express').Router();
const { fetchTweets } = require('../twitter/fetchTweets');
const {
  adjectivesToWordFrequencies,
  nounsToWordFrequencies,
} = require('../twitter/parseTweets');
const { db, Tweet, Metadata } = require('../db/index');

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
// router.post('/reset', (req, res, next) => {
//   Tweet.destroy({ where: {} })
//   Metadata.destroy({ where: {} })
//     .then(() => fetchTweets(req.body.query, 500))
//     .then(() => res.sendStatus(201))
//     .catch(next);
// });

router.post('/reset', (req, res, next) => {
  Metadata.findAll()
    .then(metadata => metadata.map(search => search.search_id))
    .then(ids => { return ids.length ? Math.max(...ids) : 0 })
    .then(lastSearchId => fetchTweets(req.body.query, 500, lastSearchId)
      .then(() => res.sendStatus(201)));
})

router.get('/:query', (req, res, next) => {
  Tweet.findAll({
    where: {
      query: req.params.query,
    },
  }).then(tweets => res.send(tweets));
});

module.exports = router;
