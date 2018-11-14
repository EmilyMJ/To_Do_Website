const dateFormat = require('dateformat');
const Task = require('../models/task.js');
//Requiring the Mongodb model Task

// CRUD
// https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/

// CREATE - adding a task using the POST request
module.exports.postTask = function (req, res) {
    console.log(req.user)
    // Each task must relate to a UserID therefore you must be logged in for a task to be added
    if (!req.user._id) {
        return res.status(400).send({

            message: "User id cannot be empty"
        });
    }

    // An error message will appear if the user tries to submit a task without inputting a task title
    if (!req.body.title) {
        return res.status(400).send({
            message: "Task title can not be empty"
        });
    }

    // A date must be inputted in a valid format for the task to be successfully added 
    if (new Date(req.body.date) === "Invalid Date" || isNaN(new Date(req.body.date))) {
        return res.status(400).send({
            message: "Date is in an invalid format"
        });
    }

    let date = req.body.date
// Content and Priority in the Task Schema are optional fields therefore a task can still be created without these,
// if a task is inputted without these the content section will be set as "No description" and the priority as "No priority"
    new Task({
        title: req.body.title,
        content: req.body.content || "No description",
        date: new Date(req.body.date),
        priority: req.body.priority || "No priority",
        userID: req.user._id
    })

    // If all the sections are filled out correctly the task is saved to the database and the user is redirected to the 
    // viewall page where they can review their tasks
        .save()
        .then(item => {
            res.redirect('/viewall?created=success');
        })

    // If their is an error and the task is not saved to the database then the user will stay on the same page
        .catch(err => {
            res.redirect('/addtask?created=error');
        });
}

// READ - Get the tasks and render them onto the screen in viewall find tasks by userID so that each user has tasks unique to them 
// and will not see every account's tasks 
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

// Rendering the tasks which have also been edited/updated through the edittask page
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

// UPDATE - Editing a task by getting the task (GET) then using POST to send the edited task to the Mongodb and rendering it on the viewall screen
// UserID must be populated to be able to edit a task as without a userID there would be no user logged in to retrieve tasks
module.exports.editTask = function (req, res) {
    if (!req.user._id) {
        return res.status(400).send({
            message: "User id cannot be empty"
        });
    }
// The same validation as add task has been set, the task title and date must be populated in order for the task change to be submitted
// When successful it will take the user back to the viewall where the updated task will be displayed.
// If unsuccessful the user will go back to the viewall page but the validation in the viewall.html page will tell the user they were unsuccessful
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




// DELETE - Removing a task from the database 
// The task is deleted by the taskId both successful and unsuccessful attempts will return to viewall using, validation messages are set in the viewall.html
module.exports.deleteTask = function (req, res) {
    Task.findOneAndDelete({ _id: req.body.taskId }, function (err, result) {
        if (!err) {
            return res.redirect('/viewall?deleted=success');
        }
        return res.redirect('/viewall?deleted=error');
    });
}


// Search tasks 
// Tasks can be searched for on the nav bar these can be searched using the Task Title and Task Content
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





