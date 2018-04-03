let express = require('express');
let admin = express.Router();

admin.get('/', (req, res) => {
  //if logged in go to home
  //else go to admin
  res.render('admin/admin');
});

admin.get('/home', (req, res) => {
  res.render('admin/home');
});

admin.use('/scrape', require('../logic/admin/scrape'));

admin.post('/submitPass', (req, res) => {
  //req.body.name
  //req.body.password
  res.redirect('/admin')
});


module.exports = admin;
