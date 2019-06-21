const passport = require('passport');
const TwitterStrategy = require('passport-twitter');
const { User } = require('../db');

//Stuff some of the user info (not the whole user) into the cookie
passport.serializeUser((user, done) => {
  done(null, {
    id: user.id, twitterId: user.twitterId,
    twitterUsername: user.twitterUsername,
    twitterDisplayName: user.twitterDisplayName,
    twitterPhoto: user.twitterPhoto });
})

//Get user from db based on the user id from cookie
passport.deserializeUser((user, done) => {
  User.findByPk(user.id)
    .then(user => done(null, user))
    .catch(error => done(error))
})

passport.use(
  new TwitterStrategy({
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    (token, tokenSecret, profile, done) => {
      User.findOne({ where: { twitterId: profile.id } })
        .then(currentUser => {
          if (currentUser) { // if already have this user in db
            done(null, currentUser)
          }
          else { // if not, create a new user in out db
            User.create({
                twitterId: profile.id,
                twitterUsername: profile.username,
                twitterDisplayName: profile.displayName,
                twitterPhoto: profile.photos[0].value,
                token,
                tokenSecret,
              })
              .then(user => done(null, user));
          }
        })
        .catch(error => done(error))
    }
  )
);
