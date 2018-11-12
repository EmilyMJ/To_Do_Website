const Task = require('../models/task.js');
//Requiring the Mongodb model Task

// Viewing all the tasks
module.exports.viewAll = function (req, res) {
    Task.find(function (err, result) {
        res.render('viewall.html', {
            tasks: result
        });
    });
};

module.exports.viewAddTask = function (req, res) {
    res.render('addtask.html');
};


module.exports.addTask = function (req, res) {
    // Create new task 
    var myData = new Task({
        title: req.body.title,
        content: req.body.content || "No description",
        priority: req.body.priority || "No priority"
    });
    // Validate the request so that their must be a title for the task
    // content and priority can be empty
    if (!req.body.title) {
        return res.status(400).send({
            message: "Task title can not be empty"
        });
    }
    // Save new task to database
    myData.save()
        .then(item => {
            res.redirect('/viewall?success');
        })
        .catch(err => {
            res.redirect('/addtask?fail');
            //res.status(400).send("The task was unable to saved to database, please try again");
        });
};

// Delete a task
module.exports.deleteTask = function (req, res) {
    Task.remove({ _id: req.params.taskId }, function (err) {
        if (!err) {
            
            // var myData = delete task({})
            //         taskId: req.body.title,
            res.redirect('/viewall?sucess');
            console.log("workss")
        }
        else {
            console.log("error")
        }
    });

}

// module.exports.deleteTask = function (req, res) {
//     Task.remove({ _id: req.params.taskId }, function (err) {
//         if (!err) {
            
//             myData.deleteTask()
//         .then(item => {
//             res.redirect('/viewall?success');
//         })
//         .catch(err => {
//             res.redirect('/viewall?fail');
//             // console.log("workss")
//         });
//     };

//     )}
// }

//         taskId: req.body.title,

// document.getElementById("deleteButton").addEventListener("click", (ev) => {
//     ev.preventDefault();

//     // Delete the task
//     fetch('/tasks/' + taskID, {
//         method: 'delete'
//     })

//     // Send the user to the homepage where their task will no longer show
//     document.location.href = '/'
// });

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
//         .then(item => {
//             res.redirect('/viewall?sucess');
//         })
//         .catch(err => {
//             res.redirect('/taskdeleted?fail');
//         });
//     });
// });
