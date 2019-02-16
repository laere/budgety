import { FETCH_BUDGETS, FETCH_BUDGET, DELETE_BUDGET } from 'actions/types';

const initialState = {
  budgetList: [],
  budget: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BUDGETS:
      return { ...state, budgetList: action.payload };
    case FETCH_BUDGET:
      console.log(action.payload);
      return { ...state, budget: action.payload };
    case DELETE_BUDGET:
      const filteredBudgets = state.budgetList.filter(id => id !== action.payload);
      return { ...state, filteredBudgets };
    default:
      return state;
  }
}
