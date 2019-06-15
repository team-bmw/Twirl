const router = require('express').Router();
const { respondToTweet } = require('../twitter/replyToTweet');

router.post('/', (req, res, next) => {
  const { tweetId, responseText, authorNameOfTweetToRespond } = req.body;

  respondToTweet(tweetId, responseText, authorNameOfTweetToRespond)
    .then(() => {
      res.statusCode(200).send('successfully respond to tweet');
    })
    .catch(next);
});

module.exports = router;
