const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Championship = mongoose.model('championships');
const Round = mongoose.model('rounds');
const League = mongoose.model('leagues');
const User = mongoose.model('users');

module.exports = app => {
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    if(req.user){
      req.logout();
    }
    res.redirect('/');
  })

  app.get('/api/championship', requireLogin, async (req, res) => {
    const championships = await Championship.find({championship_ID: req.body.championship_ID});
    res.send(championships);
  });

  app.get('/api/rounds', requireLogin, async (req, res) => {
    const rounds = await Round.find({championship_ID: req.query.championship_ID});
    res.send(rounds)
  })

  app.get('/api/leagues', async (req, res) => {
    const leagues = await League.find()
    .populate('championship_ID')
    res.send(leagues);
  });

  app.post('/api/saveMatchScore', async (req, res) => {
    console.log(req.body)
    const match = req.body;
    const round = await Round.update(
      {
        _id: match.round_ID,
        matches: { $elemMatch : { _id: match._id } }
      },
      {
        $set : {
          "matches.$.homeTeamScore": match.homeTeamScore,
          "matches.$.awayTeamScore": match.awayTeamScore
        }
      }
    )
    console.log(round)
    res.send('Saved?')
  });

  app.get('/api/myLeagues', async (req, res) => {

    const leagues = await League.find({_id: { $in: req.user.joinedLeagues }}).populate('championship_ID');
    res.send(leagues)
  })

  app.get('/api/league', async (req, res) =>{
    const league = await League.findById(req.query.leagueID);
    const rounds = await Round.find({championship_ID: league.championship_ID});
    const guesses = await League.findById(req.query.leagueID, {roundGuesses: 1});
    let myGuesses = guesses.roundGuesses.filter(guess => (guess.player.toString() === req.user._id.toString()) )
    res.send({league, rounds, myGuesses})
  });

  app.post('/api/saveRoundGuesses', async (req, res) => {
    let guesses = req.body;
    const leagueID = guesses.leagueID;
    delete guesses.leagueID;
    guesses.player = req.user._id;

    const roundGuess = await League.findOne({
      _id: leagueID,
      roundGuesses: { $elemMatch: { round: guesses.round, player: guesses.player}}
    })
    if(roundGuess){
      const updatedLeague = await League.update(
        {
          _id: leagueID,
          roundGuesses: { $elemMatch: { round: guesses.round, player: guesses.player}}
        }, {
          $set: {
            "roundGuesses.$": guesses
          }}
        )
    }else{
      updatedLeague = await League.update({
        _id: leagueID
      }, {
        $addToSet : { "roundGuesses" : guesses }
      }
      )
    }

    console.log(updatedLeague)
    // await League.findOneAndUpdate({_id:leagueID}, { $pull : { roundGuesses: {round: guesses.round, player: guesses.player}}}, {new: true}, (err, data) => console.log('Pull error and data: ', err, data));
    // const savedLeague = await League.findOneAndUpdate({_id:leagueID}, { $push : { roundGuesses:  guesses}}, {new: true}, (err, data) => console.log('Push error and data: ', err, data))
    const newGuesses = await League.findById(leagueID, {roundGuesses: 1});
    let myGuesses = newGuesses.roundGuesses.filter(guess => (guess.player.toString() === req.user._id.toString()) )
    res.send(myGuesses)
  });

  app.put('/api/addPlayerToLeague/', requireLogin, async (req, res) => {
    const league = await League.findById(req.body.leagueID);
    //Check if the league is private and if password is correct
    if(league.private){
      if(req.body.password !== league.password){
        return res.send({error: 'The password is not correct'});
      }
    }
    //Check if the player has already joined league before
    let existingPlayer = false;
    for(let i = 0; i<league.players.length; i++){
      if(league.players[i].toString() === req.user._id.toString()){
        existingPlayer = true;
        break;
      }
    }
    if(existingPlayer){
      return res.send({error: 'This user is already in this league'});
    }

    await league.players.push(req.user._id);

    const updatedLeague = await league.save();

    const user = await User.findById(req.user._id);
    await user.joinedLeagues.push(req.body.leagueID);
    const savedUser = await user.save();


    res.send('updatedLeague')
  })

  app.post('/api/league', requireLogin, async (req, res) => {
    // console.log('req.body', req.body)
    // console.log('req.user', req.user)
    const userIDArr = [req.user._id];
    const league = new League({
      name: req.body.name,
      private: req.body.private,
      password: req.body.password,
      playersLimit: req.body.playersLimit,
      championship_ID: req.body.championship_ID,
      admin: userIDArr,
      players: userIDArr
    })
    const savedLeague = await league.save();

    const user = await User.findById(req.user._id);
    await user.adminLeagues.push(savedLeague._id);
    await user.joinedLeagues.push(savedLeague._id);
    const savedUser = await user.save();

    res.send(savedLeague);
  })
}
