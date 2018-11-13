const Task = require('../models/task.js');
//Requiring the Mongodb model Task

// Adding a task - CREATE
module.exports.postTask = function (req, res) {
    console.log(req.user)
    if (!req.user._id) {
        return res.status(400).send({
            
            message: "User id cannot be empty"
        });
    }

    if (!req.body.title) {
        return res.status(400).send({
            message: "Task title can not be empty"
        });
    }

    if (new Date(req.body.date) === "Invalid Date" || isNaN(new Date(req.body.date))) {
        return res.status(400).send({
            message: "Date is in an invalid format"
        });
    }

    let date = req.body.date

    new Task({
        title: req.body.title,
        content: req.body.content || "No description",
        date: new Date(req.body.date),
        priority: req.body.priority || "No priority",
        userID: req.user._id
    })
    .save()
    .then(item => {
        res.redirect('/viewall?success');
    })
    .catch(err => {
        res.redirect('/addtask?fail');
    });
}

// Viewing all the tasks - READ
module.exports.viewAll = function (req, res) {
    Task.find({userID: req.user._id},function (err, result) {
    
        res.render('viewall.html', {
            tasks: result
        });
    });
};

module.exports.viewAddTask = function (req, res) {
    res.render('addtask.html');
};

module.exports.viewEditTask = function (req, res) {
    Task.findOne({_id: req.params.taskId},function (err, result) {
        if (!err) {
            console.log(result)
            return res.render('edittask.html', {
                task: result
            });
        }
        res.redirect('/viewall')
    });
};

// PUT Editing a task - UPDATE
module.exports.putTask = function (req, res) {
    if (!req.user._id) {
        return res.status(400).send({
            message: "User id cannot be empty"
        });
    }

    if (!req.body.title) {
        return res.status(400).send({
            message: "Task title can not be empty"
        });
    }

    if (new Date(req.body.date) === "Invalid Date" || isNaN(new Date(req.body.date))) {
        return res.status(400).send({
            message: "Date is in an invalid format"
        });
    }

    if (req.body.taskId) {
        return res.status(200).send({
            message: "Task ID recognised"
        });
    }

    // let date = req.body.date
    // new Task({
    //     title: req.body.title,
    //     content: req.body.content || "No description",
    //     date: new Date(req.body.date),
    //     priority: req.body.priority || "No priority",
    //     userID: req.body.userId
    // })
    Task.findOneAndUpdate({ _id: req.body.taskId }, req.body, function(err, result) {

    })
}

// Deleting a task - DELETE
module.exports.deleteTask = function (req, res) {
    Task.findOneAndDelete({ _id: req.body.taskId }, function (err, result) {
        if (!err) {
            return res.redirect('/viewall?success');
        }
        res.redirect('/viewall?fail');
    });
}

