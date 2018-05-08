const express = require('express');
const router = express.Router()

router.get('/current_user', (req, res) => {
  res.send(req.user);
});

router.get('/testing', (req, res) => {
  res.send({
    "yep": "sucka!"
  });
});

router.get('/logout', (req, res) => {
  if(req.user){
    req.logout();
  }
  res.redirect('/');
})

module.exports = router;
