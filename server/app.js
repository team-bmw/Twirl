require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const passportSetup = require('./config/passportSetup');

const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for API testing in Postman


// Session middleware. Creates a session cookie
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))

// Session logging middleware
app.use((req, res, next) => {
  console.log('SESSION: ', req.session)
  next()
})

// initialize passport
app.use(passport.initialize());
// use cookie from the browser
app.use(passport.session());

// Routes
app.use('/api', require('./api'));
app.use('/auth', require('./auth'));

// Static middleware
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(express.static(path.join(__dirname, '..', 'public')));

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
  console.log(err.message || err);
  res.status(err.status || 500);
  res.send(err.message || 'Internal server error!')
})

module.exports = app;
