const mongoose = require('mongoose');


const TaskSchema = mongoose.Schema({
    title: String,
    content: String,
    priority: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);