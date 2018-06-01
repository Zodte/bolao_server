const mongoose = require('mongoose');
const { Schema } = mongoose;

const roundSchema = new Schema({
  round : Number,
  matches : [{
    awayTeam: String,
    homeTeam: String,
    date: String,
    time: String
  }],
  startDate: Date,
  endDate: Date,
  championship_ID: {
    type: Schema.ObjectId,
    ref: 'championships'
  }
})

mongoose.model('rounds', roundSchema);
