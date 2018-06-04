const mongoose = require('mongoose');
const { Schema } = mongoose;

const leagueSchema = new Schema({
  name : {
    type: String,
    require: true
  },
  private : {
    type: Boolean,
    require: true
  },
  password : {
    type: String,
    require: () => this.open
  },
  playersLimit : {
    type: Number,
    require: true
  },
  admin: [{
    type: Schema.ObjectId,
    ref: 'users'
  }],
  players: [{
    type: Schema.ObjectId,
    ref: 'users'
  }],
  championship_ID: {
    type: Schema.ObjectId,
    ref: 'championships'
  }
})

mongoose.model('leagues', leagueSchema);
