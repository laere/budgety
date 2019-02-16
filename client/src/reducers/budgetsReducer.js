import _ from 'lodash';
import { FETCH_BUDGETS, FETCH_BUDGET } from 'actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_BUDGETS:
      return action.payload;
    case FETCH_BUDGET:
      return action.payload;
    default:
      return state;
  }
}
