const path = require('path');
const express = require('express');
const { fetchTweets } = require('../src/twitter/fetchTweets');

const app = express();

app.use(express.json());

// Static middleware
app.use(express.static(path.join(__dirname, '..', 'dist')));

// For all GET requests will send index.html
app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'src/index.html'))
});

// fetch and send 500 tweets, using query string
app.get('/tweets/:query', (req, res, next) => {
  fetchTweets(req.params.query, 500)
    .then(tweets => res.send(tweets));
});


// Handle 404s
app.use((req, res, next) => {
  const err = new Error('Not Found!');
  err.status = 404;
  next(err)
})

// Error handling endware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || 'Internet server error!')
})

module.exports = app;
