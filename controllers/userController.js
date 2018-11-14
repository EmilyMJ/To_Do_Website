const passport = require('passport');
const User = require('../models/user.js');
// Passport.js has been used in order to create the login/signup this is required at the top along with the User model 

// Upon sucessfully logging in and been authorised the user will be redirected to the viewall page
// If signin is unsuccessfull the login page will remain
module.exports.login = passport.authenticate('local', {
    successRedirect: '/viewall',
    failureRedirect: '/login',
    failureFlash: true
});

// rendering the login to the screen
module.exports.viewLogin = function (req, res) {
    res.render('login.html', {
        message: req.flash('error')[0]
    });
};

// rendering the signup to the screen
module.exports.viewSignup = function (req, res) {
    res.render('signup.html');
};

module.exports.signup= function(req, res) {
// If the username is empty it will cause an error
    if(!req.body.username) {
        return res.status(400).send({
            message: "Username cannot be empty"
        });
    }
// The information fields below are used to create the signup
    var newUser = new User({
        firstname: req.body.firstname, 
        surname: req.body.surname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        active: true,
    })
    
    // Upon pressing the signup button the details if filled in correctly will be saved and a new user created in the the Mongodb
    newUser.save()
    .then(item => {
        res.redirect('/login?success');
    })

    // If the sign up fails an error message will appear and the user will stay on the signup page instead of proceding to the login page and no user will be created in the database
    .catch(err => {
        res.redirect('/signup?fail');
        res.status(400).send("Unable to create your account, please try again");
    });
};


   


