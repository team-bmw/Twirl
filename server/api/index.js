const router = require('express').Router();

router.use('/tweets', require('./tweets'));
router.use('/searches', require('./searches'));

module.exports = router;
