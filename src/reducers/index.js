import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';
import { orderReducer } from './orderReducer';
import { userReducer } from './userReducer';
import { categoryReducer } from './categoryReducer';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  order: orderReducer,
  category: categoryReducer,
});

export default rootReducer;
