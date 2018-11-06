const passport = require('passport');

const task = require('../controllers/controllers.js');
const taskController = require('../controllers/taskController');
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');

module.exports = function(app) {
    //CRUD 
    // Create a Task (with taskId)
    // app.post('/task', task.create);

    // // Retrieve and read all Tasks 
    // app.get('/task', task.findAll);

    // // Retrieve and read a single Task 
    // app.get('/task/:taskId', taskController.findOne);

    // // Update a Tasknodemon app
    // app.put('/task/:taskId', task.update);

    // Delete a Task
    // app.delete('/viewAll/:taskId', taskController.delete);

    // Home
    app.get('/', homeController.home);

    // Tasks
    app.get('/viewall', taskController.viewAll);

    app.post('/addtask', taskController.addTask);
    app.get('/addtask', taskController.viewAddTask);

    // edittask html
    // app.get("/edittask", taskController.viewAll

    // login
    app.post('/login', userController.login);
    app.get('/login', userController.viewLogin);
    
};