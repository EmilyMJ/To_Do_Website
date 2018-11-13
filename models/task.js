const mongoose = require('mongoose');


const TaskSchema = mongoose.Schema({
    taskId: String,
    userID: String,
    title: String,
    content: String,
    date: Date,
    priority: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);