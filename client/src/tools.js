//rounds: arrayOfPlayers.playerObject.arrayOfRound.roundObject
export function orderRoundsByProperty(players, selectedRound, property="leaguePosition", asc=true) {
  let x;
  asc ? x = 1 : x = -1;
  const sortFun = ( a, b ) => {
    const aPos = a.rounds[selectedRound][property];
    const bPos = b.rounds[selectedRound][property];
    if(aPos > bPos){
      return x;
    }else{
      return x*-1;
    }
  }
  let arr = players;
  arr.sort(sortFun);
  return arr;
}
