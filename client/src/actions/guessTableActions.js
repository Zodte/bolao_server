import actions from './actions';

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
