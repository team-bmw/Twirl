const router = require('express').Router();

router.use('/tweets', require('./tweets'));

module.exports = router;
