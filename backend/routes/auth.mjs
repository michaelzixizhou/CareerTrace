import passport from "passport";
import express from "express";
const router = express.Router();
import db from "../db/conn.mjs";


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
    res.redirect('/');
  });
});



export default router;
