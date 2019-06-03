const router = require('express').Router();

// router for twitter Oauth login :/auth/twitter/
router.use('/twitter', require('./twitter'));

// Logout DELETE : /auth/logout
// When logout, redirect to homepage
router.delete("/logout", (req, res) => {
  req.logout();
  res.sendStatus(204)
});

// GET :/auth/loggedIn
//Return the currently logged in user
router.get('/loggedIn', (req, res, next) => {
  if (!req.session.passport.user) {
    const error = new Error('Not logged in');
    error.status = 401;
    return next(error);
  }
  res.send(req.session.passport.user);
});

module.exports = router;
