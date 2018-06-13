import actions from '../actions/actions';

const guessTable = (state={
  selectedRound: 1,
  rounds: [],
  edit: false,
  roundGuessing: [],
  roundGuesses: []
}, action) => {
  switch (action.type) {
    case actions.GUESS_TABLE_NEXT_ROUND:
      let round = state.selectedRound+ 1;
      return {...state, selectedRound: round, roundGuessing: []}
    case actions.GUESS_TABLE_PREV_ROUND:
      round = state.selectedRound - 1;
      return {...state, selectedRound: round, roundGuessing: []}
    case actions.GUESS_TABLE_SET_ROUND:
      return {...state, selectedRound: action.payload.round, roundGuessing: []}
    case actions.GUESS_TABLE_SET_ROUNDS:
      return {...state, rounds: [...action.payload.rounds]}
    case actions.GUESS_TABLE_EDIT_ROUND:
      return {...state, edit: true}
    case actions.GUESS_TABLE_SAVE_ROUND_GUESSES:
      console.log(action.payload)
      return {...state, edit: false}
    case actions.GUESS_TABLE_SET_MATCH_GUESS:
      let guesses = state.roundGuessing
      .filter(match => match.matchID !== action.payload.matchID);
      return {...state, roundGuessing : [...guesses, action.payload]}

    default:
      return state;
  }
}

export default guessTable;
