const Task = require('../models/task.js');
//Requiring the Mongodb model Task

// Viewing all the tasks
module.exports.viewAll = function(req, res) {
    Task.find(function (err,result) {
        res.render('viewall.html', {
            tasks: result
        });
    });
};

module.exports.viewAddTask = function(req, res) {
    res.render('addtask.html');
};


module.exports.addTask = function(req, res) {
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
            res.redirect('/viewall?success');
        })
        .catch(err => {
            res.redirect('/addtask?fail');
            //res.status(400).send("The task was unable to saved to database, please try again");
        });
};



// Delete a task

// module.exports.deleteTask = function(req, res) {
//     Task.find(function (err,result) {

//         myData.delete
//         .then(item => {
//             res.redirect('/viewall?sucess');
//         })
//         .catch(err => {
//             res.redirect('/taskdeleted?fail');
//         });
//     });
// };

// Delete a task with the specified taskId in the request
// module.exports.deleteTask = function(req, res) {
//     Task.findByIdAndRemove(req.params.taskId)
//  var myData = delete task({})
//         taskId: req.body.title,
    
    
      
// app.post("/delete/:id", function(req, res) {
//     // Find the current user and set the active property to false (Log out the user.)
//    Task.findOneAndUpdate({_id: req.params.id}, { $set: { active: false }}, function(err, data) {
//         console.log(data);
//         data.active = false;    //Log the user out.
//         res.redirect("/");
//     });
// })