let express = require('express');
let database = express.Router();

database.get('/leagueTable', (req, res) => {
  res.send('/leagueTable')
});


module.exports = database;
