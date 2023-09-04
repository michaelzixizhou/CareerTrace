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
            successRedirect: '/api/profile',
        })
);

router.post(
    '/logout', function(req, res, next) {
        req.logout(function(err) {
            if (err) { return next(err); }
            req.session.destroy();
            res.redirect('/');

        });
    });

export default router;
