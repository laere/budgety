import { FETCH_BUDGETS, FETCH_BUDGET } from 'actions/types';

const initialState = {
  budgetList: [],
  budget: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BUDGETS:
      return { ...state, budgetList: action.payload };
    case FETCH_BUDGET:
      return { ...state, budget: action.payload };
    default:
      return state;
  }
}
