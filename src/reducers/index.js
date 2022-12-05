import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

export default rootReducer;
