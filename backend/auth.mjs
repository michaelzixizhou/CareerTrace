const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./db/conn.mjs');

let user = null;

passport.use(
    new GoogleStrategy(
        {
            clientID: '187418418847-v40m3gjec6iv7070da636liv0asub8vj.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'auth/google/callback',
        }
        ,
        async (accessToken, refreshToken, profile, done) => {
            try {
                const users = db.collection("users");

                const existingUser = await users.findOne({ googleId: profile.id });
                if (existingUser) {
                    return done(null, existingUser);
                }

                const newUser = {
                    googleId: profile.id,
                    username: profile.displayName 
                }
                await users.insertOne(newUser);
                user = done(null, newUser);
            } catch (error) {
                user = done(error, null);
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})


export default done;
