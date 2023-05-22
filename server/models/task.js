const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;