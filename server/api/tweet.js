const router = require('express').Router();
const { respondToTweet } = require('../twitter/replyToTweet');

router.post('/', (req, res, next) => {
  const { tweetId, responseText, authorNameOfTweetToRespond } = req.body;

  respondToTweet(
    tweetId,
    responseText,
    authorNameOfTweetToRespond,
    (err, data, response) => {
      if (err) {
        console.log(err);
      } else res.status(201).send('successfully respond to tweet');
    }
  );
});

module.exports = router;
