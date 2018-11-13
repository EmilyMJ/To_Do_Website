const Task = require('../../models/task.js');

function deleteTask(taskId) {
    Task.remove({ _id: taskId }, function (err) {
        if (!err) {
            res.redirect('/viewall?sucess');
            console.log("WORKS")
        }
        else {
            console.log("error")
        }
    });

}
