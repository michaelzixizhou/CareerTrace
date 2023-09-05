import passport from "passport";
import express from "express";
const router = express.Router();

router.get(
    '/google',
    passport.authenticate("google")
);

router.get(
    '/google/callback',
    passport.authenticate('google',
        {
            failureRedirect: '/',
            successReturnToOrRedirect: '/',
        })
);

router.post(
    '/logout', function(req, res, next) {
        req.logout(function(err) {
            if (err) { return next(err); }
            req.session.destroy();
            console.log("user logged out");
            res.redirect('/');
        });
    });

export default router;
