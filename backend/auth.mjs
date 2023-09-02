import GoogleStrategy from "passport-google-oidc";
import db from "./db/conn.mjs";


function initializePassport(passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env['GOOGLE_CLIENT_ID'],
                clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
                callbackURL: '/user/auth/google/callback',
                scope: ['profile'],
            }
            ,
            function verify(issuer, profile, done) {
                try {
                    console.log(profile);
                    const users = db.collection("users");

                    const existingUser = users.findOne({ googleId: profile.id });
                    if (existingUser) {
                        return done(null, existingUser);
                    }

                    const newUser = {
                        googleId: profile.id,
                        username: profile.displayName
                    }
                    users.insertOne(newUser);
                    return done(null, profile);
                } catch (error) {
                    console.log("Error with Google sign-in");
                }
            }
        )
    )

    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
            cb(null, { id: user.id, username: user.username, name: user.name });
        });
    });

    passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
            return cb(null, user);
        });
    });
}


export default initializePassport;
