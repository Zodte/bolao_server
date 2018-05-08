import actions from './actions';

export function leagueTableNextRound() {
  return {
    type: actions.LEAGUE_TABLE_NEXT_ROUND
  }
}

export function leagueTablePrevRound() {
  return {
    type: actions.LEAGUE_TABLE_PREV_ROUND
  }
}

export function leagueTableSetRound(round) {
  return {
    type: actions.LEAGUE_TABLE_SET_ROUND,
    payload: { round }
  }
}
