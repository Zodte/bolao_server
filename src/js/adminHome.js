//let teams = ["Arsenal", "Manchester United", "Manchester City", "Chelsea", "Liverpool", "Tottenham Hotspur",
            // "Burnley", "Leicester City", "Watford", "Everton", "Southampton", "Huddersfield Town", "Brighton & Hove Albion",
            // "AFC Bournemouth", "Stoke City", "Newcastle United", "West Bromwich Albion", "West Ham United", "Swansea City",
            // "Crystal Palace"];
let teams = ["Arsenal", "Watford", "Everton", "Chelsea"];
let selectedTeams = [];
let matches = {};

function init(){
  let homeInput = document.querySelector('.homeTeam_input');
  let awayInput = document.querySelector('.awayTeam_input');

  homeInput.addEventListener("focus", function(e){
    loadTeams(this);
  })
  awayInput.addEventListener("focus", function(e){
    loadTeams(this);
  })
  homeInput.addEventListener("focusout", function(e){
    focusOut(this);
  })
  awayInput.addEventListener("focusout", function(e){
    focusOut(this);
  })
}

function loadTeams(object){
  let datalist = document.createElement('datalist');
  datalist.id = 'teams';
  console.log('testing')
  let option;
  for(let i = 0; i<teams.length; i++){
    if(selectedTeams.indexOf(teams[i]) === -1 ){
      option = document.createElement('option');
      option.value = teams[i];
      datalist.append(option);
    }
  }
  object.append(datalist);
}

function focusOut(object){
  object.innerHTML = '';
}

function addMatch(){
  let homeInput = document.querySelector('.homeTeam_input').value;
  let awayInput = document.querySelector('.awayTeam_input').value;
  let date = new Date(document.querySelector('.matchDate').value);
  let round = document.querySelector('.round').value
  date.setHours(document.querySelector('.matchHour').value);
  date.setMinutes(document.querySelector('.matchMinutes').value);

  if(correctMatchCheck(homeInput, awayInput, date)){
    selectedTeams.push(homeInput);
    selectedTeams.push(awayInput);

    let match = {};
    match.homeTeam = homeInput;
    match.awayTeam = awayInput;
    match.date = date;
    match.round = round;
    let curMatch = homeInput.replace(/\s/g, '') + awayInput.replace(/\s/g, '');
    matches[curMatch] = match;

    console.log(JSON.stringify(matches))

    document.querySelector('.homeTeam_input').value = '';
    document.querySelector('.awayTeam_input').value = '';

  }else {
    console.log('nopsy')
  }


  showReadyMatches();
}

function showReadyMatches(){
  let div = document.querySelector('.readyMatches');
  div.innerHTML = '';
  let m;
  let p;
  let n;
  for(let match in matches){
    //
    m = document.createElement('div');
    m.classList.add('match');

    //
    p = document.createElement('p');
    let day = matches[match].date.getDate();
    let month = matches[match].date.getMonth()+1;
    let year = matches[match].date.getFullYear();
    let hour = matches[match].date.getHours();
    let minute = matches[match].date.getMinutes();
    let date = day + "-" + month + "-" + year + " " + hour + ":" + minute;
    n = document.createTextNode(date);
    p.appendChild(n);
    m.appendChild(p);

    //
    p = document.createElement('p');
    p.classList.add(nameToClass('homeTeam', match));
    n = document.createTextNode(matches[match].homeTeam);
    p.appendChild(n);
    m.appendChild(p);

    //
    p = document.createElement('p');
    p.classList.add(nameToClass('awayTeam', match));
    n = document.createTextNode(matches[match].awayTeam);
    p.appendChild(n);
    m.appendChild(p);

    //
    p = document.createElement('input');
    p.classList.add(match);
    p.setAttribute('type', 'button');
    p.setAttribute('value', 'remove');
    p.addEventListener("click", function(e){
      removeMatch(this);
    })
    m.appendChild(p);

    div.appendChild(m);
  }
}

function nameToClass(name, number){
  let className = name.replace(/\s/g, '');
  className += number;
  return className;
}

function removeMatch(object){
  let id = object.classList.item(0);
  let homeTeam = document.querySelector('.homeTeam' + id).innerHTML;
  let awayTeam = document.querySelector('.awayTeam' + id).innerHTML;
  selectedTeams.splice(selectedTeams.indexOf(homeTeam), 1);
  selectedTeams.splice(selectedTeams.indexOf(awayTeam), 1);
  delete matches[id];
  showReadyMatches();
}

function createRound(){
  if(selectedTeams.length === teams.length){
    $.ajax({
      method      : 'POST',
      //change later this uri needs to adapt for website release
      url       : 'http://localhost:8080/database/rounds/saveRound',
      data      : matches,
      sucess    : function(data) {
                    console.log(data);
                  }
    })
  }else{
    console.log("Not all matches completed")
  }
}

function matchesSavedSuccessfully(){

}

//check if everything is ok for new match
function correctMatchCheck(homeInput, awayInput, date){

  let today = new Date();

  if(isNaN(date.valueOf())){
    console.log('A date needs to be set');
    return false;
  }else if(date < today){
    console.log('This date has already passed');
    return false;
  }else if( homeInput === awayInput ){
    console.log('A team cant compete against itself');
    return false;
  }else if( teams.indexOf(homeInput) === -1 ){
    console.log('Home team is not corrently part of this league');
    return false;
  }else if( teams.indexOf(awayInput) === -1 ){
    console.log('Away team is not corrently part of this league');
    return false;
  }else if( selectedTeams.indexOf(homeInput)  >= 0 ){
    console.log('Home team is already part of a match in this round')
    return false;
  }else if( selectedTeams.indexOf(awayInput)  >= 0 ){
    console.log('Away team is already part of a match in this round')
  }else {
    return true;
  }
}

init();
