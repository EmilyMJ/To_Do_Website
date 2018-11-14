// const Task = require('../models/task.js');
//Requiring the Mongodb model Task

// Viewing all the tasks
// module.exports.viewAll = function (req, res) {
    // [Object object]
    // console.log(JSON.stringify({user: 'will', id: 'billion'}));
    // console.log('user:', req.user)
    // Task.find({userID: req.user._id},function (err, result) {
        
//         res.render('viewall.html', {
//             tasks: result
//         });
//     });
// };

// module.exports.viewAddTask = function (req, res) {
//     console.log(req.user);
//     res.render('addtask.html');
// };

// Delete a task
// module.exports.deleteTask = function (req, res) {
//     Task.remove({ _id: req.params.taskId }, function (err) {
//             res.remove('viewall.html', {
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
// }