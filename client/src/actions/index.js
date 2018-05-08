import axios from 'axios';
import actions from './actions'

export const fetchUser = () => async dispatch => {
    const res = await axios.get('./auth/api/current_user')
    dispatch({
        type: actions.FETCH_USER,
        payload: res.data
    });
};
