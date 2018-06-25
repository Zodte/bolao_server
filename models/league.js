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
  },
  roundGuesses: {
    type: [{
      round: {
        type: Number,
        require: true
      },
      player: {
        type: Schema.ObjectId,
        ref: 'users',
        require: true
      },
      guesses: [{
        matchID: String,
        homeTeamGuess: Number,
        awayTeamGuess: Number
      }]
    }]
}
})

mongoose.model('leagues', leagueSchema);
