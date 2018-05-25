const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');
const Championship = mongoose.model('championships');

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

  app.post('/api/championshipRound', requireLogin, requireAdmin, async (req, res) => {
    console.log('Received: ', req.body)
    res.send('Completed')
  })

};
