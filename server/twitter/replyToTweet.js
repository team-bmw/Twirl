const client = require('./twitterSetup');

const respondToTweet = (tweetId, responseText, authorNameOfTweetToRespond) => {
  const status = `@${authorNameOfTweetToRespond} ${responseText}`;

  client.post(
    'status/update',
    { in_reply_to_status_id: tweetId, status },
    (err, data, response) => {
      if (err) {
        console.log('Respond to tweet failed.');
        console.log(err);
      } else {
        console.log('Successfully responded to Tweet!');
      }
    }
  );
};

module.exports = {
  respondToTweet,
};
