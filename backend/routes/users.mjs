import passport from "passport";
import express from "express";
const router = express.Router();

router.get(
    '/auth/google',
    passport.authenticate("google", {
        scope: ['profile'],
    })
);

router.get(
    '/auth/google/callback',
    passport.authenticate('google', 
        { 
            failureRedirect: '/',
            successRedirect: '/profile',
        })
);

router.get("/test", (req, res) => {res.send("hi")});

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
    res.send(`Welcome, ${req.user.username}!`);
});

export default router;
