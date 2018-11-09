const mongoose = require('mongoose');


const TaskSchema = mongoose.Schema({
    taskId: String,
    title: String,
    content: String,
    priority: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);