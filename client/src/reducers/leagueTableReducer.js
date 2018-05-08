import actions from '../actions/actions'
const leagueTable = (
  state={
    selectedRound: 2,
    sortBy: 'leaguePosition',
    roundsByPlayer: [
      {
        "name": "Peck Oskarsson",
        "rounds": [
          {
            "round": 1,
            "leaguePosition": 2,
            "leaguePoints": 11,
            "leaguePerfect": 2,
            "leagueCorrect": 5,
            "leagueMisses": 3,
            "gold": 0,
            "silver": 1,
            "bronze": 0,
            "underdog": 0
          },
          {
            "round": 2,
            "leaguePosition": 1,
            "leaguePoints": 23,
            "leaguePerfect": 5,
            "leagueCorrect":8,
            "leagueMisses": 7,
            "gold": 1,
            "silver": 1,
            "bronze": 0,
            "underdog": 0
          }
        ]
      },
      {
        "name": "Pedro Luis",
        "rounds": [
          {
            "round": 1,
            "leaguePosition": 1,
            "leaguePoints": 12,
            "leaguePerfect": 2,
            "leagueCorrect": 6,
            "leagueMisses": 2,
            "gold": 1,
            "silver": 0,
            "bronze": 0,
            "underdog": 0
          },
          {
            "round": 2,
            "leaguePosition": 2,
            "leaguePoints": 20,
            "leaguePerfect": 3,
            "leagueCorrect": 11,
            "leagueMisses": 4,
            "gold": 1,
            "silver": 1,
            "bronze": 0,
            "underdog": 0
          }
        ]
      }
    ]
  }, action) => {
    switch (action.type) {
      case actions.LEAGUE_TABLE_NEXT_ROUND:
        let round = state.selectedRound+ 1;
        return {...state, selectedRound: round}
      case actions.LEAGUE_TABLE_PREV_ROUND:
        round = state.selectedRound - 1;
        return {...state, selectedRound: round}
      case actions.LEAGUE_TABLE_SET_ROUND:
        return {...state, selectedRound: action.payload.round}

      default:
        return state;
    }
}

export default leagueTable;
