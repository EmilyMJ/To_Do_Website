const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const defineRoutes = require('./routes/routes.js');
const passport = require('passport');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;
const nunjucksEnv = nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Configuring the database and requiring mongoose
const dbConfig = require('./config/config.js');
const mongoose = require('mongoose');

var path = require('path');
const Task = require('./models/task.js');
const User = require('./models/user.js');

mongoose.Promise = global.Promise;

// Connecting to the Mongo Database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now.', err);
    process.exit();
});

// Find static files from the directory
app.use("/resources", express.static(__dirname + '/resources'));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Getting cookie parser to use for sessions and Login 
app.use(cookieParser());
app.use(session({
    secret: "secret",
    //store: sessionStore, // connect-mongo session store
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            console.log("successfully logged in")
            return done(null, user);

        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);

    });
});


// Destroying the session so that it logs the user out
app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');

    });
});

// Getting passport for login
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// Define all the routes
defineRoutes(app);

// Listening for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});