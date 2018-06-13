import actions from './actions';
import axios from 'axios';

export function guessTableNextRound() {
  return {
    type: actions.GUESS_TABLE_NEXT_ROUND
  }
}

export function guessTablePrevRound() {
  return {
    type: actions.GUESS_TABLE_PREV_ROUND
  }
}

export function guessTableSetRound(round) {
  return {
    type: actions.GUESS_TABLE_SET_ROUND,
    payload: { round }
  }
}

export function guessTableSetRounds(rounds) {
  return {
    type: actions.GUESS_TABLE_SET_ROUNDS,
    payload: { rounds }
  }
}

export const guessTableEditRound = () => {
  return {
    type: actions.GUESS_TABLE_EDIT_ROUND
  }
}

export const guessTableSaveRoundGuesses = round => async dispatch => {
  const res = await axios.post('./api/saveRoundGuesses', round);
  dispatch({
    type: actions.GUESS_TABLE_SAVE_ROUND_GUESSES,
    payload: { round: res.data }
  })
}

export function guessTableSetMatchGuess(matchGuess){
  return {
    type: actions.GUESS_TABLE_SET_MATCH_GUESS,
    payload: matchGuess
  }
}
