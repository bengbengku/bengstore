import Cookies from 'js-cookie';

export function cartReducer(
  state = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [],
  action
) {
  switch (action.type) {
    case 'ADD_CART':
      return [...state, action.payload];
    case 'INC_CART':
      const itemIndexInc = state.findIndex((item) => item._id === action.payload._id);
      const newArrayInc = [...state];
      newArrayInc[itemIndexInc].qty = newArrayInc[itemIndexInc].qty += 1;
      return [...state];
    case 'DEC_CART':
      const itemIndexDec = state.findIndex((item) => item._id === action.payload._id);
      const newArrayDec = [...state];
      if (newArrayDec[itemIndexDec].qty < 2) {
        newArrayDec[itemIndexDec].qty = 1;
      } else {
        newArrayDec[itemIndexDec].qty = newArrayDec[itemIndexDec].qty -= 1;
      }

      return [...state];
    case 'REMOVE_CART':
      return [];
    default:
      return state;
  }
}
