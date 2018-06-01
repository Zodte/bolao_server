const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');
const Championship = mongoose.model('championships');
const Round = mongoose.model('rounds');

module.exports = app => {
  app.get('/api/championship', requireLogin, async (req, res) => {
    const championships = await Championship.find();

    res.send(championships);
  });

  app.post('/api/championship', requireLogin, requireAdmin, async (req, res) => {
    const championship = new Championship({
      name: req.body.name,
      teams: req.body.teams
    });
    const savedChampionship = await championship.save();
    res.send(savedChampionship);
  });

  app.get('/api/round', requireLogin, async (req, res) => {
    console.log('getting rounds')
    const rounds = await Round.find();
    res.send(rounds)
  })

  app.post('/api/round', requireLogin, requireAdmin, async (req, res) => {
    console.log('saving round')
    let startDate = new Date(`${req.body.matches[0].date} ${req.body.matches[0].time}`);
    let endDate = new Date(`${req.body.matches[0].date} ${req.body.matches[0].time}`);
    for(let i in req.body.matches){
      let match = req.body.matches[i]
      let matchDate = new Date(`${match.date} ${match.time}`)
      if(startDate > matchDate){
        startDate = matchDate;
      }
      if(endDate < matchDate){
        endDate = matchDate;
      }
    }
    const round = new Round({
      round: req.body.round,
      matches: req.body.matches,
      startDate: startDate,
      endDate: endDate,
      championship_ID: req.body.championship_ID
    })

    const savedRound = await round.save();
    console.log('round saved')
    res.send(savedRound)
  })

};
