import { FETCH_BUDGETS, FETCH_BUDGET, DELETE_BUDGET } from 'actions/types';

const initialState = {
  budgetList: [],
  budget: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BUDGETS:
      return {
        ...state,
        budgetList:
        action.payload
      };
    case FETCH_BUDGET:
      return {
        ...state,
        budget: action.payload
      };
    case DELETE_BUDGET:
      return {
        ...state,
        budgetList: state.budgetList.filter(budget => budget._id !== action.payload)
      };
    default:
      return state;
  }
}
