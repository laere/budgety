import { FETCH_BUDGETS } from 'actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_BUDGETS:
      return action.payload;
    default:
      return state;
  }
}
