import axios from 'axios';
import actions from './actions'

export const leaguesTableFetchAll = () => async dispatch => {
    const res = await axios.get('./api/leagues')
    dispatch({
        type: actions.LEAGUES_TABLE_FETCH_ALL,
        payload: res.data
    });
};

export const leaguesTablePromptJoinLeague = league => {
  return {
    type: actions.LEAGUES_TABLE_PROMPT_JOIN_LEAGUE,
    payload: league
  }
}

export const leaguesTableFetchMyLeagues = () => async dispatch => {
  const res = await axios.get('./api/myLeagues')
  dispatch({
    type: actions.LEAGUES_TABLE_FETCH_MY_LEAGUES,
    payload: res.data
  })
}
