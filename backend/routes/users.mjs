import passport from "passport";
import express from "express";
const router = express.Router();
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

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

router.get('/profile', async (req, res) => {
    if (!req.user) {
        return res.redirect('/');
    }

    // let collection = await db.collection("users");


    res.send(`Welcome ${req.user.id}`);
});

router.get('/userdata', (req, res) => {
    let collection = db.collection("users");
    let results = collection.find({}).toArray();
    res.send(results).status(200);
}
)

export default router;
