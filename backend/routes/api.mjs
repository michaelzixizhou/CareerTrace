import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Debugging, gets a JSON with all users
router.get('/userdata', async (req, res) => {
    let collection = db.collection("users");
    let results = await collection.find().toArray();
    res.send(results).status(200);
});

// Debugging, removes given user based on ID from the database
router.delete("/:id", async (req, res) => {
    let query = { _id: req.params.id };
    let collection = db.collection("users");

    let result = await collection.deleteOne(query);

    res.send(result).status(200);
});

// Debugging, removes all users from the database
router.delete("/", async (req, res) => {
    let collection = db.collection("users");
    let result = await collection.deleteMany({});

    res.send(result).status(200);
});

// Gives unique job ids
async function getNextJobId(userId) {
    // Find and update the counter
    let counterCollection = db.collection("users");
    let result = await counterCollection.findOneAndUpdate(
        { _id: userId },
        { $inc: { jobCounter: 1 } },
        { upsert: true, returnOriginal: false }
    );

    return parseInt(JSON.parse(result.jobCounter));
};

// Stores new users to the database
router.get('/profile', async (req, res) => {
    if (!req.user) {
        return res.redirect('/');
    }

    let collection = db.collection("users");
    let userid = req.user.id;
    let query = { _id: userid };

    let user = await collection.findOne(query);

    if (user) {
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
    }

    res.send(req.user).status(200);
});

router.get("/jobs", async (req, res) => {
    let user = req.user;
    if (!user) {
        res.redirect('/');
    }
    console.log(req.user.name);
});

router.post("/:id/jobs", async (req, res) => {
    let currUserID = req.params.id;
    let collection = db.collection("users");

    let newJobID = await getNextJobId(currUserID)

    let newJob = {
        jobid: newJobID,
        company: req.body.company,
        role: req.body.role,
        jobCycle: req.body.jobCycle,
        applicationStage: req.body.applicationStage,
        dateEvent: req.body.dateEvent,
        location: req.body.location,
        duration: req.body.duration,
        pay: req.body.pay,
        rejected: req.body.rejected,
    };

    let result = await collection.updateOne(
        { _id: currUserID },
        {
            $push: {
                jobapps: newJob
            }
        }
    );
    res.send(result).status(204);
});


router.post("/jobs", async (req, res) => {
    if (!req.user) {
        res.redirect('/');
    };

    let currUserID = req.user.id;
    let collection = db.collection("users");


    let newJobID = await getNextJobId(currUserID)

    let newJob = {
        jobid: newJobID,
        company: req.body.company,
        role: req.body.role,
        jobCycle: req.body.jobCycle,
        applicationStage: req.body.applicationStage,
        dateEvent: req.body.dateEvent,
        location: req.body.location,
        duration: req.body.duration,
        pay: req.body.pay,
        rejected: req.body.rejected,
    };

    let result = await collection.updateOne(
        { _id: currUserID },
        {
            $push: {
                jobapps: newJob
            }
        }
    );
    res.send(result).status(204);
});

// Get data based on user ID 
router.get("/:id", async (req, res) => {
    let collection = db.collection("users");
    let query = { _id: req.params.id };
    let result = await collection.findOne(query);
    res.send(result);
});

router.get("/", (req, res) => {
    res.send("API Home Page")
});

function removeUndefinedValues(obj) {
    Object.keys(obj).forEach((key) => {
        if (obj[key] === undefined) {
            delete obj[key];
        }
    });
}

router.patch("/:id/jobs/:jobid", async (req, res) => {
    let query = { _id: req.params.id, "jobapps.jobid": parseInt(req.params.jobid) };
    let reqBody = req.body
    let updates = {
        "jobapps.$.company": reqBody.company,
        "jobapps.$.role": reqBody.role,
        "jobapps.$.applicationStage": reqBody.applicationStage,
        "jobapps.$.jobCycle": reqBody.jobCycle,
        "jobapps.$.dateEvent": reqBody.dateEvent,
        "jobapps.$.location": reqBody.location,
        "jobapps.$.duration": reqBody.duration,
        "jobapps.$.pay": reqBody.pay,
        "jobapps.$.rejected": reqBody.rejected,
    };

    removeUndefinedValues(updates)
    console.log(updates)

    let setUpdates = {
        "$set": updates
    }
    let collection = db.collection("users");
    let result = await collection.updateOne(query, setUpdates);

    res.send(result).status(200);
});

router.delete("/:id/jobs/:jobid", async (req, res) => {
    let currJobID = parseInt(req.params.jobid);
    let query = { _id: req.params.id, "jobapps.jobid": currJobID }
    let updates = {
        "$pull": {
            "jobapps": {
                "jobid": currJobID
            }
        }
    }

    let collection = db.collection("users");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
})



export default router;

