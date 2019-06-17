const router = require('express').Router();
const { fetchTweets } = require('../twitter/fetchTweets');
const { fetchTimedTweets } = require('../twitter/fetchTimedTweets');
const {
  adjectivesToWordFrequencies,
  nounsToWordFrequencies,
} = require('../twitter/parseTweets');
const { tweetsToLineChartData } = require('../twitter/lineChartData');
const { Tweet, Metadata } = require('../db/index');

// Fetch data from twitter (500 most recent)
router.post('/search/:searchType', (req, res, next) => {
  Metadata.findAll()
    .then(metadata => metadata.map(search => search.search_id))
    .then(ids => { return ids.length ? Math.max(...ids) : 0 })
    .then(lastSearchId => fetchTweets(req.body.query, 500, lastSearchId, req.params.searchType)
      .then(search_id => res.send(`${search_id}`)));
})

// Fetch data from twitter (100 per day for past 7 days)
router.post('/search/timed/:searchType', (req, res, next) => {
  Metadata.findAll()
    .then(metadata => metadata.map(search => search.search_id))
    .then(ids => { return ids.length ? Math.max(...ids) : 0 })
    .then(lastSearchId => fetchTimedTweets(req.body.query, lastSearchId, req.params.searchType)
      .then(search_id => res.send(`${search_id}`)));
});

router.get('/:query', (req, res, next) => {
  Tweet.findAll({
    where: {
      query: req.params.query,
    },
  }).then(tweets => res.send(tweets));
});

// fetch adjective word frequency objects
router.get('/adjectives/:searchId/:query', (req, res, next) => {
  console.log(req.params.searchId);
  Tweet.findAll({
    where: {
      search_id: Number(req.params.searchId),
    },
  })
    .then(tweets => adjectivesToWordFrequencies(tweets, req.params.query))
    .then(adj => res.send(adj))
    .catch(next);
});

// fetch noun word frequency objects
router.get('/nouns/:searchId/:query', (req, res, next) => {
  Tweet.findAll({
    where: {
      search_id: Number(req.params.searchId),
    },
  })
    .then(tweets => nounsToWordFrequencies(tweets, req.params.query))
    .then(noun => res.send(noun))
    .catch(next);
});

// fetch line chart data (adjectives)
router.get('/adjectives/lineChart/:searchId/:query', (req, res, next) => {
  console.log('being called')
  Tweet.findAll({
    where: {
      search_id: Number(req.params.searchId),
    },
  })
    .then(tweets => tweetsToLineChartData(tweets, req.params.query))
    .then(lineChartData => res.send(lineChartData))
    .catch(next);
})


module.exports = router;
