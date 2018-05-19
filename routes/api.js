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
}
