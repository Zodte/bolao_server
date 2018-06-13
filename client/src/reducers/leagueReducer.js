import actions from '../actions/actions'

export default function (state = {
  selectedLeague: null,
  fetchLeague_Id: ''
}, action) {
  switch (action.type) {
    case actions.LEAGUE_FETCH_LEAGUE:
      return {...state, fetchLeague_Id:'', selectedLeague: action.payload}
    case actions.LEAGUE_ADD_FETCH_ID:
      return {...state, fetchLeague_Id: action.payload}
    default:
      return state;
  }
}
