const passport = require('passport');
const User = require('../models/user');

module.exports.login = passport.authenticate('local', {
// app.post('/login'),
// passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
});

module.exports.viewLogin = function (req, res) {
    res.render('login.html', {
        message: req.flash('error')[0]
    });
};

module.exports.signup= function(req, res) {
//Creating a signup form for new users
var newUser = new User({
    firstname: req.body.firstname, 
    surname: req.body.surname,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    active: true,
});

if(!req.body.email) {
    return res.status(400).send({
        message: "Email cannot be empty"
    });
}

newUser.save()
    .then(item => {
        res.redirect('/viewall?success');
    })
    .catch(err => {
        res.redirect('/signupfail');
        res.status(400).send("Unable to create your account, please try again");
    });
};

   


