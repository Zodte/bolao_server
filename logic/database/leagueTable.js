let express = require('express');
const mongoose = require('mongoose');
let moment = require('moment');

let app     = express();

app.post('/saveRound', (req, res) => {
  // NEED TO UPDATE FOR MONGOOSE
  // client.connect((err) => {
  //   if(!err){
  //     for(let match in req.body){
  //       let date = new Date(req.body[match].date);
  //       date = moment(date);
  //       let dateString = date.format(dateFormat);
  //       client.query('INSERT INTO "premierLeague1718" ("round", "date", "homeTeam", "awayTeam") VALUES ($1, $2, $3, $4)',
  //                     [req.body[match].round, dateString, req.body[match].homeTeam, req.body[match].awayTeam], (err, result) => {
  //         if(err){
  //           console.log(err);
  //         }else{
  //           console.log('yey')
  //         }
  //
  //       })
  //     }
  //
  //   }
  // });
  res.send("yey")
})

app.get('/getLeagueTableByLeague', (req, res) => {
  res.send({
    "Hey":"Hello"
  })
})

module.exports = app;