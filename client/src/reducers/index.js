import { combineReducers } from 'redux';

import playersReducer from './playersReducer';
import leagueTableReducer from './leagueTableReducer';
import roundTableReducer from './roundTableReducer';
import guessTableReducer from './guessTableReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  players: playersReducer,
  leagueTable: leagueTableReducer,
  roundTable: roundTableReducer,
  guessTable: guessTableReducer,
  auth: authReducer
});

export default rootReducer;
