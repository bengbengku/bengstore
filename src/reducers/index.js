import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';
import { orderReducer } from './orderReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  order: orderReducer,
});

export default rootReducer;
