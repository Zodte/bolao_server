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
    const championships = await Championship.find();
    res.send(championships);
  });

  app.get('/api/round', requireLogin, async (req, res) => {
    const rounds = await Round.find();
    res.send(rounds)
  })

  app.get('/api/leagues', async (req, res) => {
    const leagues = await League.find()
    .populate('championship_ID')
    res.send(leagues);
  });

  app.get('/api/myLeagues', async (req, res) => {

    const leagues = await League.find({_id: { $in: req.user.joinedLeagues }}).populate('championship_ID');
    res.send(leagues)
  })

  app.get('/api/league', async (req, res) =>{
    const league = await League.findById(req.query.leagueID);
    const rounds = await Round.find({championship_ID: league.championship_ID});
    res.send({league, rounds})
  });

  app.post('/api/saveRoundGuesses', async (req, res) => {
    let guesses = req.body;
    const leagueID = guesses.leagueID;
    delete guesses.leagueID;
    guesses.player = req.user._id;
    await League.findOneAndUpdate({_id:leagueID}, { $pull : { roundGuesses: {round: guesses.round, player: guesses.player}}}, {new: true}, (err, data) => console.log(err, data));
    const savedLeague = await League.findOneAndUpdate({_id:leagueID}, { $push : { roundGuesses:  guesses}}, {new: true})
    console.log("saved",savedLeague)
    // if(league.roundGuesses){
    //   console.log('before round guesses: ',league.roundGuesses)
    //   const res = await league.roundGuesses.pull({round: guesses.round});
    //   console.log(res)
    //   await league.roundGuesses.push(guesses);
    //   const savedLeague = await league.save();
    //   console.log('saved round guesses: ',savedLeague.roundGuesses)
    // }


    res.send('savedLeague')
  })

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
