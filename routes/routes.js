const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const TodoModel = mongoose.model("Todo");

router.get("/", (req, res) => {
    res.json({ message: "API IS WORKING" });
});

router.get("/getData", (req, res) => {
    TodoModel.find((err, docs) => {
        if (!err) {
            res.status(200).json({ data: docs });
        }
    });
});

router.post("/add", async(req, res) => {
    const { title, description } = req.body;
    console.log(title);

    const todo = TodoModel({ title: title, description: description });

    await todo.save();

    res.status(200).json({
        data: todo
    });
});

router.delete("/delete", async(req, res) => {

    const filter = {
        "id": req.body.id,
    };
    await TodoModel.deleteOne(filter).then((data) => res.status(200).json({
        data: data,
    })).catch((err) => {
        console.log(err);
        return res.status(500).send(err);
    });
});

router.patch("/update", async(req, res) => {

    const filter = {
        "title": req.body.title,
    };

    const updatedData = {
        "description": req.body.description,
    };

    await TodoModel.updateOne(filter, updatedData, {
        new: false,
    }).then((data) => res.status(200).json({
        data: data,
    })).catch((err) => {
        console.log(err);
        return res.status(500).send(err);
    });
});

module.exports = router;