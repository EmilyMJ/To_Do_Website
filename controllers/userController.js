const passport = require('passport');
const User = require('../models/user.js');

module.exports.login = passport.authenticate('local', {
// app.post('/login'),
// passport.authenticate('local', {
    successRedirect: '/viewall',
    failureRedirect: '/login',
    failureFlash: true
});

module.exports.viewLogin = function (req, res) {
    res.render('login.html', {
        message: req.flash('error')[0]
    });
};

module.exports.viewSignup = function (req, res) {
    res.render('signup.html');
};

module.exports.signup= function(req, res) {
    //Creating a signup form for new users

    // Validate the request so that their must be a username for the task
    // content and priority can be empty
    if(!req.body.username) {
        return res.status(400).send({
            message: "Username cannot be empty"
        });
    }

    var newUser = new User({
        firstname: req.body.firstname, 
        surname: req.body.surname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        active: true,
    })
    
    // Save the new user to the database
    newUser.save()
    .then(item => {
        res.redirect('/login?success');
    })
    .catch(err => {
        res.redirect('/signup?fail');
        // res.status(400).send("Unable to create your account, please try again");
    });
};


   


