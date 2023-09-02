import passport from "passport";
import express from "express";
const router = express.Router();

router.get(
    '/auth/google',
    passport.authenticate("google")
);

router.get(
    '/auth/google/callback',
    passport.authenticate('google', 
        { 
            failureRedirect: '/',
            successRedirect: '/user/profile',
        })
);

router.get(
    '/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    }
);

router.get('/profile', (req, res) => {
    if (!req.user) {
        return res.redirect('/');
    }
    res.send(`Welcome, ${req.user.displayName}!`);
});

export default router;
