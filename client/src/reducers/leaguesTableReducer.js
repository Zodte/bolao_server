import actions from '../actions/actions'

export default function (state = {
  allLeagues: [],
  selectedLeague: null,
  joinLeaguePrompt: false,
  joinSelectedLeague: null
}, action) {
  switch (action.type) {
    case actions.LEAGUES_TABLE_FETCH_ALL:
      return {...state, allLeagues: action.payload};
    case actions.LEAGUES_TABLE_PROMPT_JOIN_LEAGUE:
      return {...state, joinLeaguePrompt:true, joinSelectedLeague: action.payload}
    case actions.LEAGUES_TABLE_FETCH_MY_LEAGUES:
      return {...state, allLeagues: action.payload};
    default:
      return state;
  }
}
