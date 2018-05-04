/* eslint no-param-reassign: ["error", { "props": false }] */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

//Load keys
const keys = require('./config/keys');

//Map global promises
mongoose.Promise = global.Promise;
//Mongoose connect
mongoose.connect(keys.mongoURI)
  .then(() => console.log('mongoDB connecteed'))
  .catch(err => console.log(err))

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname));
app.set('view engine', 'pug');

//Load User model
require('./models/user');

// Passport config
require('./config/passport')(passport);

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/admin', require('./routes/admin'));

app.use('/database', require('./routes/database'));

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}))
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//set gloval vars
app.use((req, res, next) => {
  res.locals.user.user = req.user || null ;
})

app.use('/auth', require('./routes/auth'))

app.get('/information', (req, res) => {
  res.render('information');
});



// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    /* jshint unused: false */

    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {

  /* jshint unused: false */

  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: { },
  });
});

module.exports = app;
