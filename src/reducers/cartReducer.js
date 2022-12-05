import Cookies from 'js-cookie';

export function cartReducer(
  state = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [],
  action
) {
  switch (action.type) {
    case 'ADD_CART':
      return [...state, action.payload];
    default:
      return state;
  }
}
