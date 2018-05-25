const mongoose = require('mongoose');
const { Schema } = mongoose;

const championshipMatchesSchema = new Schema({
  round : String,
  matches : [Object],
  

})

mongoose.model('championships', championshipSchema);
