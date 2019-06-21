const router = require('express').Router();
const Twitter = require('twitter');
const { User } = require('../db');


router.post('/', (req, res, next) => {
  const currentUser = req.session.passport.user;
  const { tweetId, responseText, authorNameOfTweetToRespond } = req.body;
  const status = `@${authorNameOfTweetToRespond} ${responseText}`;
  
  User.findByPk(currentUser.id)
  .then(user => new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY, //application
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET, //application
    access_token_key: user.token, //loggedin user
    access_token_secret: user.tokenSecret, //loggedin user
  }))
  .then(sessionClient => sessionClient.post('statuses/update', { in_reply_to_status_id: tweetId, status }))
  .then(() => res.status(201).send('successfully respond to tweet'))
  .catch(next)
});


module.exports = router;
