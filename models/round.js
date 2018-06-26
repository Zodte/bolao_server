const mongoose = require('mongoose');
const { Schema } = mongoose;

const roundSchema = new Schema({
  round : Number,
  matches : [{
    awayTeam: String,
    homeTeam: String,
    awayTeamScore: Number,
    homeTeamScore: Number,
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

roundSchema.index({ round: 1, championship_ID: 1 }, { unique: true })

mongoose.model('rounds', roundSchema);
