let express = require('express');
let database = express.Router();

database.use('/rounds', require('../logic/database/rounds'));


module.exports = database;
