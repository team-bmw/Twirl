const router = require('express').Router();
const { createSearchArray } = require('../twitter/helperFunctions');
const { Metadata } = require('../db/index');

// fetch adjective word frequency objects
router.get('/:dataType', (req, res, next) => {
    Metadata.findAll({
        where: {
            dataType: req.params.dataType,
        }
    })
        .then(metadata => res.send(createSearchArray(metadata)))
        .catch(next);
})

module.exports = router;
