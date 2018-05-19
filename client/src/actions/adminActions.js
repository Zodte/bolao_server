import axios from 'axios';
import actions from './actions';

export const adminCreateNewChampionship = (championship) => async dispatch => {
  const res = await axios.post('./api/championship', championship)
  dispatch({
      type: actions.ADMIN_CREATE_NEW_CHAMPIONSHIP,
      payload: res.data
  });
};
