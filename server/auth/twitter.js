const router = require('express').Router();
const passport = require('passport');

// auth with twitter handled with passport
// GET /auth/twitter
router.get('/', passport.authenticate('twitter'));

// // callback route for twitter to redirect to with oauth token
// // after the OAuth has been authenticated successfully
// // token can then be exchange for the actual user info
// GET /auth/twitter/callback
router.get(
  '/callback',
  passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);

module.exports = router;
