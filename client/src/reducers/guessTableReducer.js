import actions from '../actions/actions';

const guessTable = (state={
  selectedRound: 1,
  rounds: [
    {
      round: 1,
      roundCompleted: false,
      games: [
        {
          homeTeam: "Arsenal",
          awayTeam: "Liverpool",
          homeGuess: 0,
          awayGuess: 0
        },
        {
          homeTeam: "Everton",
          awayTeam: "Chelsea",
          homeGuess: 0,
          awayGuess: 0
        }
      ]
    },
    {
      round: 2,
      roundCompleted: false,
      games: [
        {
          homeTeam: "Arsenal",
          awayTeam: "Chelsea",
          homeGuess: 0,
          awayGuess: 0
        },
        {
          homeTeam: "Everton",
          awayTeam: "Liverpool",
          homeGuess: 0,
          awayGuess: 0
        }
      ]
    }
  ],
}, action) => {
  switch (action.type) {
    case actions.GUESS_TABLE_NEXT_ROUND:
      let round = state.selectedRound+ 1;
      return {...state, selectedRound: round}
    case actions.GUESS_TABLE_PREV_ROUND:
      round = state.selectedRound - 1;
      return {...state, selectedRound: round}
    case actions.GUESS_TABLE_SET_ROUND:
      return {...state, selectedRound: action.payload.round}

    default:
      return state;
  }
}

export default guessTable;
