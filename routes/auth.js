const express = require('express');
const router = express.Router()
const passport = require('passport');

router.get('/google', passport.authenticate('google',
  {
    scope: ['profile', 'email']
  }
));

router.get('/google/callback',
passport.authenticate('google', { failureRedirect: '/'}), (req, res) => {
  res.redirect('/')
});

router.get('/verify', (req, res) => {
  if(req.user){

  }else{

  }
})

router.get('/logout', (req, res) => {
  if(req.user){
    req.logout();
    res.redirect('/');
  }else{

  }
})

module.exports = router;
