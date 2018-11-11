const Task = require('../models/task.js');
const User = require('../models/user.js');

// Create and Save a new Task
exports.create = (req, res) => {
   
    // Create new task 
    var myData = new Task({
        title: req.body.title, 
        content: req.body.content || "No description",
        priority: req.body.priority || "No priority"
    });
    // Validate the request so that their must be a title for the task
    // content and priority can be empty
    if(!req.body.title) {
        return res.status(400).send({
            message: "Task title can not be empty"
        });
    }
    // Save new task to database
    myData.save()
        .then(item => {
            res.redirect('/?success');
        })
        .catch(err => {
            res.redirect('/addtask?fail');
            //res.status(400).send("The task was unable to saved to database, please try again");
        });
};

// Retrieve and return all task from the database
exports.findAll = (req, res) => {
    console.log("getting all tasks")
    Task.find()
    .then(task=> {
        res.send(task);  
    }).catch(err => {
        res.status(500).send({ 
            message: err.message || "There was an error retrieving task."
        });
    });
};

// Find a single task with a taskId
exports.findOne = (req, res) => {
    Task.findById(req.params.noteId)
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.taskId
            });            
        }
        res.send(task);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving task with id " + req.params.taskId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Task content can not be empty"
        });
    }

    // Find a task and update it
    Task.findByIdAndUpdate(req.params.taskId, {
        title: req.body.title || "Untitled Task",
        content: req.body.content
    }, {new: true})
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });
        }
        res.send(task);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });                
        }
        return res.status(500).send({
            message: "Error updating task with id " + req.params.taskId
        });
    });
};

// // Delete a task with the specified taskId in the request
// exports.delete = (req, res) => {
//     Task.findByIdAndRemove(req.params.taskId)
//     .then(task => {
//         if(!task) {
//             return res.status(404).send({
//                 message: "Task not found with id " + req.params.taskId
//             });
//         }
//         res.send({message: "Task deleted successfully!"});
//     }).catch(err => {
//         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//             return res.status(404).send({
//                 message: "Task not found with id " + req.params.taskId
//             });                
//         }
//         return res.status(500).send({
//             message: "Could not delete task with id " + req.params.taskId
//         });
//     });
// };

