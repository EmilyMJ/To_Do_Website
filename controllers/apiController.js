const dateFormat = require('dateformat');
const Task = require('../models/task.js');
//Requiring the Mongodb model Task

// Adding a task - CREATE
module.exports.postTask = function (req, res) {
    console.log(req.user)
    // Each task must relate to a UserID therefore you must be logged in for a task to be added
    if (!req.user._id) {
        return res.status(400).send({

            message: "User id cannot be empty"
        });
    }

    // Error message will appear if the user tries to submit a task without inputting a task title
    if (!req.body.title) {
        return res.status(400).send({
            message: "Task title can not be empty"
        });
    }

    // Date must be put in a valid format for the task to be successfully added 
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
            res.redirect('/viewall?created=success');
        })
        .catch(err => {
            res.redirect('/addtask?created=error');
        });
}

// Viewing all the tasks - READ
module.exports.viewAll = function (req, res) {
    Task.find({ userID: req.user._id }, function (err, result) {
        const updated = req.query.updated
        const deleted = req.query.deleted
        const created = req.query.created
        res.render('viewall.html', {
            tasks: result,
            updated,
            deleted,
            created
        });
    });
};

module.exports.viewAddTask = function (req, res) {
    res.render('addtask.html');
};

module.exports.viewEditTask = function (req, res) {
    Task.findOne({ _id: req.params.taskId }, function (err, result) {
        if (!err) {
            return res.render('edittask.html', {
                task: {
                    ...result.toObject(),
                    date: dateFormat(result.date, 'yyyy-mm-dd')
                }
            });
        }
        res.redirect('/viewall')
    });
};



// Editing a task - UPDATE
module.exports.editTask = function (req, res) {
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

    Task.findOneAndUpdate({ _id: req.body.taskId }, req.body, function (err, result) {
        if (!err) {
            return res.redirect('/viewall?updated=success');
        }
        return res.redirect('/viewall?updated=error');
    })
}




// Deleting a task - DELETE
module.exports.deleteTask = function (req, res) {
    Task.findOneAndDelete({ _id: req.body.taskId }, function (err, result) {
        if (!err) {
            return res.redirect('/viewall?deleted=success');
        }
        return res.redirect('/viewall?deleted=error');
    });
}


// Search tasks 
module.exports.searchTask = function (req, res) {
    Task.find({
        $and: [
            { userID: req.user._id },
            {
                $or: [
                    { title: { '$regex' : req.query.search, '$options' : 'i' } },
                    { content: { '$regex' : req.query.search, '$options' : 'i' } }
                ]
            }
        ]
    }, function (err, result) {
        if (!err) {
            return res.render('search.html', {
                search: req.query.search,
                tasks: result
            });
        }
        res.redirect('/viewall')
    });
};
//     Task.find({
//         title: req.query.search
//     },function (err, result) {
//         console.log(result);
//         return res.json({
//             task: result
//         });
//     });
// };





