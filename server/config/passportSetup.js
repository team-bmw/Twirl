const passport = require('passport');
const TwitterStrategy = require('passport-twitter');
const { User } = require('../db');

passport.use(
  new TwitterStrategy(
    {
      //options for strategy
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: '/auth/twitter/callback',
    },
    (token, tokenSecret, profile, done) => {
      // console.log(profile);
      User.findOne({ where: { twitterId: profile.id } }).then(currentUser => {
        if (currentUser) {
          console.log('currentUSer', currentUser.get())
        } else {
          User.create({
            twitterId: profile.id,
            twitterUsername: profile.username,
            twitterDisplayName: profile.displayName,
            twitterPhoto: profile.photos[0].value,
          }).then(user => console.log('new user created', user.get()));
        }
      });
    }
  )
);
