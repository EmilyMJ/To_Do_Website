const Task = require('../models/task.js');
//Requiring the Mongodb model Task

// Viewing all the tasks
module.exports.viewAll = function (req, res) {
    // [Object object]
    // console.log(JSON.stringify({user: 'will', id: 'billion'}));
    console.log(req.user)
    Task.find({userID: req.user._id},function (err, result) {
        
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
        date: req.body.date || "No Due Date",
        priority: req.body.priority || "No priority",
        userID: req.user._id
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
// module.exports.deleteTask = function (req, res) {
//     Task.remove({ _id: req.params.taskId }, function (err) {


        
            // res.remove('viewall.html', {
            //     tasks: result
            // });
    //     });
    //     if (!err) {
    //         res.redirect('/viewall?sucess');
    //         console.log("workss")
    //     }
    //     else {
    //         console.log("error")
    //     }
    // ;

//}

// module.exports.deleteTask = function (req, res) {
        // Task.remove({userID: req.user._id},function (err, result) {
    
    
            // Task.find({userID: req.user._id},function (err, result) {
            
    //             res.render('viewall.html', {
    //                 tasks: result
    //             });
    //         });
    //         if (!err) {
    //             res.redirect('/viewall?sucess');
    //             console.log("workss")
    //         }
    //         else {
    //             console.log("error")
    //         }
    //     ;
    
    // }

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