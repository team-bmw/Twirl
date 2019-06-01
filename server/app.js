require('dotenv').config();
const path = require('path');
const express = require('express');

const app = express();

app.use(express.json());
app.use('/api', require('./api'));

// Static middleware
app.use(express.static(path.join(__dirname, '..', 'dist')));

// For all GET requests will send index.html
app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'src/index.html'))
});

// Handle 404s
app.use((req, res, next) => {
  const err = new Error('Not Found!');
  err.status = 404;
  next(err)
})

// Error handling endware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.send(err.message || 'Internal server error!')
})

module.exports = app;
