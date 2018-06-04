const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Championship = mongoose.model('championships');
const Round = mongoose.model('rounds');
const League = mongoose.model('leagues');

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

  app.get('/api/league', async (req, res) => {
    const leagues = await League.find();
    res.send(leagues);
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
    res.send(savedLeague);
  })
}
