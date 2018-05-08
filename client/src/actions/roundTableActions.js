import actions from './actions';

export function roundTableNextRound() {
  return {
    type: actions.ROUND_TABLE_NEXT_ROUND
  }
}

export function roundTablePrevRound() {
  return {
    type: actions.ROUND_TABLE_PREV_ROUND
  }
}

export function roundTableSetRound(round) {
  return {
    type: actions.ROUND_TABLE_SET_ROUND,
    payload: { round }
  }
}
