const router = require('express').Router();

// router for twitter Oauth login :/auth/twitter/
router.use('/twitter', require('./twitter'));

// Logout GET : /auth/logout
// When logout, redirect to homepage
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect('/#/');
});

module.exports = router;
