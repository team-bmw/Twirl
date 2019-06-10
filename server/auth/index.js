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
  if (req.session.passport && req.session.passport.user) {
    res.send(req.session.passport.user);
  } else {
    res.sendStatus(200)
  }
});

module.exports = router;
