const express = require("express");
const Task = require("../models/task");
const router = express.Router();

router.post("/tasks", async (req, res) => {
    const task = new Task({ ...req.body, });
    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get("/tasks/:id", async (req, res) => {
    try {
        const tasks = await Task.find({
            owner: req.params.id
        });
        res.send(tasks);
    } catch (e) {
        res.send(e);
    }
});


router.get("/tasks/single/:id", async (req, res) => {
    const _id = req.params.id;
    console.log(_id);
    try {
        const task = await Task.findOne({ _id });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
});

router.patch("/tasks/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = ["description", "completed"];
    const isValidOperation = updates.every((update) => {
        return allowUpdates.includes(update);
    });
    if (!isValidOperation) {
        res.send({ ERROR: "INVALID OPERATION!" });
    } try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});



router.delete("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, });

        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.send(e);
    }
});

module.exports = router;





