import axios from 'axios';
import actions from './actions'

export const leagueFetchLeague = leagueID => async dispatch => {
    const res = await axios.get(`./api/league?leagueID=${leagueID}`)
    dispatch({
        type: actions.LEAGUE_FETCH_LEAGUE,
        payload: res.data
    });
};

export const leagueAddFetchId = id => {
  return {
    type: actions.LEAGUE_ADD_FETCH_ID,
    payload: id
  }
}
