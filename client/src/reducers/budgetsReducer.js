import { FETCH_BUDGETS, FETCH_BUDGET, IS_LOADING } from "actions/types";

const initialState = {
  budgetList: [],
  budget: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        loading: true
      };
    case FETCH_BUDGETS:
      return {
        ...state,
        budgetList: action.payload,
        loading: false
      };
    case FETCH_BUDGET:
      return {
        ...state,
        budget: action.payload,
        loading: false
      };

    default:
      return state;
  }
};
