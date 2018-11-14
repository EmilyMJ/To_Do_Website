const passport = require('passport');

const task = require('../controllers/controllers.js');
// const taskController = require('../controllers/taskController');
const apiController = require('../controllers/apiController');
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');

module.exports = function(app) {
    // Add tasks - CREATE
    app.post('/addtask', apiController.postTask);
    app.get('/addtask', apiController.viewAddTask);
    
    // View tasks - READ
    app.get('/viewall', apiController.viewAll);

    //Edit tasks - UPDATE
    app.get('/task/:taskId', apiController.viewEditTask);
    app.post('/editTask', apiController.editTask);

    // Delete a Task
    // app.delete('/deleteTask/:taskId', apiController.deleteTask);
    app.post('/deleteTask', apiController.deleteTask);


    // Search a Task
    app.get('/search', apiController.searchTask);

    // Home
    app.get('/', homeController.home);

    // login
    app.post('/login', userController.login);
    app.get('/login', userController.viewLogin);

    app.post('/signup', userController.signup);
    app.get('/signup', userController.viewSignup);
    
};