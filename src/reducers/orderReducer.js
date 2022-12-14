export function orderReducer(state = { idAddress: '', ongkir: 0, subtotal: 0, total: 0 }, action) {
  switch (action.type) {
    case 'ADD_ORDER':
      return action.payload;
    case 'UPDATE_ORDER':
      return { ...state, orders: action.payload };
    default:
      return state;
  }
}
