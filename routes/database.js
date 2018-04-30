let express = require('express');
let database = express.Router();

database.use('/leagueTable', require('../logic/database/leagueTable'));


module.exports = database;
