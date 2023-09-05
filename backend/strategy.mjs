import GoogleStrategy from "passport-google-oidc";


function initializePassport(passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env['GOOGLE_CLIENT_ID'],
                clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
                callbackURL: '/auth/google/callback',
                scope: ['profile', 'email'],
            }
            ,
            function verify(issuer, profile, done) {
                try {
                    let newUser = {
                        id: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                    }
            
                    // users.insertOne(newUser);
                    return done(null, newUser);
                } catch (error) {
                }
            }
        )
    )

    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
            cb(null, { id: user.id, name: user.name, email: user.email});
        });
    });

    passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
            return cb(null, user);
        });
    });

    
}


export default initializePassport;
