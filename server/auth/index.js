const router = require('express').Router();

// router for twitter Oauth login :/auth/twitter/
router.use('/twitter', require('./twitter'));

// Logout DELETE : /auth/logout
// When logout, redirect to homepage
router.delete('/logout', (req, res) => {
  req.logout();
  res.sendStatus(204);
});

// GET :/auth/loggedIn
//Return the currently logged in user
router.get('/loggedIn', (req, res, next) => {
  const error = new Error('Not logged in!');
  error.status = 401;
  if (req.session.passport) {
    if (!req.session.passport.user) {
      return next(error);
    }
    res.send(req.session.passport.user);
  } else {
    return next(error);
  }
});

module.exports = router;
