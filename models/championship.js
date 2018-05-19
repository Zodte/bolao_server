const mongoose = require('mongoose');
const { Schema } = mongoose;

const championshipSchema = new Schema({
  name : String,
  teams : [String]
})

mongoose.model('championships', championshipSchema);
