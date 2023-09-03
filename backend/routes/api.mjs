import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();



// Debugging, gets a JSON with all users
router.get('/userdata', async (req, res) => {
    let collection = await db.collection("users");
    let results = await collection.find().toArray();
    res.send(results).status(200);
});

// Debugging, removes given user based on ID from the database
router.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("users");

    let result = await collection.deleteOne(query);

    res.send(result).status(200);
});

// Debugging, removes all users from the database
router.delete("/", async (req, res) => {
    const collection = db.collection("users");
    let result = await collection.deleteMany({});

    console.log("deleted all")
    res.send(result).status(200);
});

// Gives unique job ids
async function getNextJobId(userId) {
    // Find and update the counter
    const counterCollection = db.collection("users");
    const result = await counterCollection.findOneAndUpdate(
        { _id: userId },
        { $inc: { jobCounter: 1 } },
        { upsert: true, returnOriginal: false }
    );

    console.log(result.jobCounter)
    return parseInt(JSON.parse(result.jobCounter));
};

// Stores new users to the database
router.get('/profile', async (req, res) => {
    if (!req.user) {
        return res.redirect('/');
    }

    let collection = await db.collection("users");
    let userid = req.user.id;
    let query = { _id: userid };

    let user = await collection.findOne(query);

    if (user) {
        console.log("User found");
    } else {
        console.log(JSON.stringify(req.user));
        let newUser = {
            _id: userid,
            name: req.user.name,
            email: req.user.email,
            jobapps: [],
            jobCounter: 0
        }
        collection.insertOne(newUser);
        console.log("New user saved");
    }

    res.send(`Welcome ${req.user.name}`);
});

router.get("/jobs", async (req, res) => {
    let user = req.user;
    if (!user) {
        res.redirect('/');
    }
    console.log("Jobs");
    console.log(req.user.name);
});

router.post("/:id/jobs", async (req, res) => {
    let currUserID = req.params.id;
    let collection = await db.collection("users");

    let newJobID = await getNextJobId(currUserID)

    let newJob = {
        jobid: newJobID,
        company: req.body.company,
        role: req.body.role,
        dateapplied: req.body.dateapplied,
        currstatus: req.body.currstatus,
        maxstatus: req.body.maxstatus,
        location: req.body.location,
        duration: req.body.location,
        pay: req.body.pay
    };

    let result = await collection.updateOne(
        { _id: currUserID },
        {
            $push: {
                jobapps: newJob
            }
        }
    );
    console.log(JSON.stringify(req.body));
    res.send(result).status(204);
});



router.post("/jobs", async (req, res) => {
    if (!req.user) {
        res.redirect('/');
    };

    let currUserID = req.user.id;
    let collection = await db.collection("users");


    let newJob = {
        jobid: getNextJobId(currUserID),
        company: req.body.company,
        role: req.body.role,
        dateapplied: req.body.dateapplied,
        currstatus: req.body.currstatus,
        maxstatus: req.body.maxstatus,
        location: req.body.location,
        duration: req.body.location,
        pay: req.body.pay
    };

    let result = await collection.updateOne(
        { _id: currUserID },
        {
            $push: {
                jobapps: newJob
            }
        }
    );
    console.log(JSON.stringify(req.body));
    res.send(result).status(204);
});


// Get data based on user ID 
router.get("/:id", async (req, res) => {
    let collection = await db.collection("users");
    let query = { _id: req.params.id };
    let result = await collection.findOne(query);

    res.send(result);
});

router.get("/", (req, res) => {
    console.log("API Home Page");
    res.send("API Home Page")
});


router.patch("/:id/jobs", async (req, res) => {
    const query = { _id: req.params.id };
    const updates = {
        company: req.body.company,
        role: req.body.role,
        dateapplied: req.body.dateapplied,
        currstatus: req.body.currstatus,
        maxstatus: req.body.maxstatus,
        location: req.body.location,
        duration: req.body.location,
        pay: req.body.pay
    };

    Object.key(updates).forEach((key) => {
        if (obj[key] === undefined) {
            delete obj[key];
        }
    });
    console.log(updates)

    let collection = await db.collection("users");
    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);
});






export default router;
