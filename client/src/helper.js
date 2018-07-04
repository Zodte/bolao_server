export const orderPlayersByPosition = (players, round, property="leaguePosition") => {
  const sortFun = ( a, b ) => {
    const aPos = a.rounds[round][property];
    const bPos = b.rounds[round][property];
    if(aPos > bPos){
      return -1;
    }else{
      return 1;
    }
  }
  let arr = players;
  arr.sort(sortFun);
  this.setState({players: arr});
}

export const orderRounds = (championship) => {
  const sortFun = ( a, b ) => {
    const aPos = a.round;
    const bPos = b.round;
    if(aPos > bPos){
      return 1;
    }else{
      return -1;
    }
  }

  let arr = championship;
  arr.sort(sortFun);
  return arr;
}
