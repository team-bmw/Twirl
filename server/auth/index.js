const router = require('express').Router();

// router for twitter Oauth :/auth/twitter/
router.use('/twitter', require('./twitter'));

module.exports = router;
