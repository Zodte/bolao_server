import actions from '../actions/actions';
import { orderRounds } from '../helper';

const guessTable = (state={
  selectedRound: 1,
  rounds: [],
  edit: false,
  roundGuessing: [],
  roundGuesses: [],
  myGuesses: []
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
    case actions.LEAGUE_FETCH_LEAGUE:
      let rounds = orderRounds(action.payload.rounds)
      return {...state, rounds: rounds, myGuesses: [...action.payload.myGuesses]}
    case actions.GUESS_TABLE_EDIT_ROUND:
      return {...state, edit: true}
    case actions.GUESS_TABLE_SAVE_ROUND_GUESSES:
      return {...state, edit: false, myGuesses: action.payload.guesses}
    case actions.GUESS_TABLE_SET_MATCH_GUESS:
      let guesses = state.roundGuessing
      .filter(match => match.matchID !== action.payload.matchID);
      return {...state, roundGuessing : [...guesses, action.payload]}
    case actions.GUESS_TABLE_PREVIEW_ROUND:
      return {...state, edit:false}
    default:
      return state;
  }
}

export default guessTable;
