import GoogleStrategy from "passport-google-oauth20";
import db from "./db/conn.mjs";


function initializePassport(passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: '187418418847-v40m3gjec6iv7070da636liv0asub8vj.apps.googleusercontent.com',
                clientSecret: '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',
                callbackURL: '/user/auth/google/callback',
                scope: ['profile'],
                state: true,
            }
            ,
            async (accessToken, refreshToken, profile, done) => {
                try {
                    console.log(profile);
                    // const users = db.collection("users");
                    //
                    // const existingUser = await users.findOne({ googleId: profile.id });
                    // if (existingUser) {
                    //     return done(null, existingUser);
                    // }
                    //
                    // const newUser = {
                    //     googleId: profile.id,
                    //     username: profile.displayName
                    // }
                    // await users.insertOne(newUser);
                    // done(null, profile);
                } catch (error) {
                    console.log("Error with Google sign-in");
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
}


export default initializePassport;
