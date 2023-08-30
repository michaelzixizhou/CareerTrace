import express, { Router } from "express";
import db from "../db/conn.mjs";
import { Collection, ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
    let collection = await db.collection("records");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
    let collection = await db.collection("records");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

router.post("/", async (req, res) => {
    let newDocument = {
        company: req.body.company,
        position: req.body.position,
        starttime: req.body.starttime,
        duration: req.body.duration,
        status: req.body.status,
        assessment: req.body.assessment,
    };

    let collection = await db.collection("records");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
});

router.patch("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.param.id) };
    const updates = {
        $set: {
            company: req.body.company,
            position: req.body.position,
            starttime: req.body.starttime,
            duration: req.body.duration,
            status: req.body.status,
            assessment: req.body.assessment,
        }
    };

    let collection = await db.collection("records");
    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);
});

router.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("records");

    let result = await collection.deleteOne(query);

    res.send(result).status(200);
});

export default router;

