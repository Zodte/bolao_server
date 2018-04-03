let express = require('express');
let fs = require('fs');
let request = require('request');
let cheerio = require('cheerio');
let app     = express();

app.get('/', (req, res) => {

  let url = "http://www.livescore.com";

  request(url, function(error, response, html){
    let game;

    if(!error){
      console.log(html);
      console.log(response.statusCode);
      console.log('please')
      let $ = cheerio.load(html);

      // let games = $('.ply span', '.ply');
      // game = games.text()
    }else{
      console.log(error)
    }
  })

  res.send('uyi');

})

module.exports = app;
