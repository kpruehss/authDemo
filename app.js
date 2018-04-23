const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('./models/user');

mongoose.connect('mongodb://localhost/auth_demo_app');

const app = express();
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);
app.use(
  require('express-session')({
    secret: 'arwen is a hooman',
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//========
// ROUTES
//========
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/secret', (req, res) => {
  res.render('secret');
});

// Auth Routes
// show sign up form
app.get('/register', (req, res) => {
  res.render('register');
});

// Handle user signup
app.post('/register', (req, res) => {
  req.body.username;
  req.body.password;
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        return res.render('register');
      }
      passport.authenticate('local')(req, res, () => {
        res.redirect('/secret');
      });
    }
  );
});

// LOGIN ROUTES
// Render login form
app.get('/login', (req, res) => {
  res.render('login');
});

// login logic
//middleware
app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
  }),
  (req, res) => {}
);

app.get('logout', (req, res) => {
  res.send('Ok, Login you out....soon');
});

app.listen(app.get('port'), () => {
  console.log('Server started');
});
