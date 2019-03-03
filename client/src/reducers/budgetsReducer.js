import {
  FETCH_BUDGETS,
  FETCH_BUDGET,
  DELETE_BUDGET,
  IS_LOADING,
  FETCH_TRANSACTION
} from "actions/types";

const initialState = {
  budgetList: [],
  budget: {},
  transaction: {},
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
    case DELETE_BUDGET:
      return {
        ...state,
        budgetList: state.budgetList.filter(
          budget => budget._id !== action.payload
        )
      };
    case FETCH_TRANSACTION:
      return {
        ...state,
        transaction: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
