export function categoryReducer(state = '', action) {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return action.payload;
    default:
      return state;
  }
}
