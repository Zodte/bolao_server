/* eslint no-param-reassign: ["error", { "props": false }] */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname));
app.set('view engine', 'pug');
// breyta þarf hér fyrir    user   password                    database

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/admin', require('./routes/admin.js'));

app.use('/database', require('./routes/database.js'));

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
