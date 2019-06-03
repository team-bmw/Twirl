const passport = require('passport');
const TwitterStrategy = require('passport-twitter');
const { User } = require('../db');

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((user, done) => {
  User.findByPk(user.id)
  .then(user => done(null, user))
  .catch(error => done(error))
})

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    (token, tokenSecret, profile, done) => {
      User.findOne({ where: { twitterId: profile.id } })
      .then(currentUser => {
        if (currentUser) { // if already have this user in db
          done(null, currentUser)
        } else { // if not, create a new user in out db
          User.create({
            twitterId: profile.id,
            twitterUsername: profile.username,
            twitterDisplayName: profile.displayName,
            twitterPhoto: profile.photos[0].value,
          })
          .then(user => done(null, user));
        }
      })
      .catch(error => done(error))
    }
  )
);
