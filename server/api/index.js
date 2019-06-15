const router = require('express').Router();

router.use('/tweets', require('./tweets'));
router.use('/searches', require('./searches'));
router.use('/tweet', require('./tweet'));

module.exports = router;
