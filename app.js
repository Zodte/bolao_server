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

//Load User model
require('./models/user');

// Passport config
require('./config/passport')(passport);

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}))
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./routes/api'));
app.use('/admin', require('./routes/admin'));
app.use('/database', require('./routes/database'));
app.use('/auth', require('./routes/auth'));

if(process.env.NODE_ENV === 'production'){
  //Express will serve up production assets
  // like oyr main.js file, or main.css file
  //app.use(express.static('client/build'));
  //Express will serve uo the index.html profile
  // if it doens't recognize the route
  // const path = require('path');
  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  //});

}

module.exports = app;
