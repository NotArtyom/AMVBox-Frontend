import authReducer from './authReducer';
import { combineReducers } from 'redux';
import regReducer from './regReducer';
import confReducer from './confReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  reg: regReducer,
  conf: confReducer,
  prof: profileReducer
});

export default rootReducer
