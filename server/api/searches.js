const router = require('express').Router();
const { createSearchArray } = require('../twitter/helperFunctions');
const { Metadata } = require('../db/index');

// fetch adjective word frequency objects
router.get('/', (req, res, next) => {
    Metadata.findAll()
        .then(metadata => res.send(createSearchArray(metadata)))
        .catch(next);
})

module.exports = router;
