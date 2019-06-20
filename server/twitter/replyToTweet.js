const client = require('./twitterSetup');

const respondToTweet = (
  tweetId,
  responseText,
  authorNameOfTweetToRespond,
  callback
) => {
  const status = `@${authorNameOfTweetToRespond} ${responseText}`;

  client.post(
    'statuses/update',
    { in_reply_to_status_id: tweetId, status },
    callback
  );
};

module.exports = {
  respondToTweet,
};
